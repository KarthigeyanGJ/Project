import React, { useState, useEffect, useContext } from "react";
import "./BookAppointment.css";
import axios from "axios";
import { UserContext } from "../../App";

export default function BookAppointment() {
  const { state, dispatch } = useContext(UserContext);
  const [isBooked, setBook] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [patient, setPatient] = useState({});
  const [timings, setTiming] = useState(0);
  const [patId, setPatId] = useState(0);
  const [docId, setDocId] = useState(0);
  const [getAllTime, setAllTime] = useState([]);
  const handleTiming = (e) => {
    setTiming(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:8082/doctor/getAllDoctors",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setAllDoctors(res.data);
    });

    axios.get("http://localhost:8086/timing/getAllTiming",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setAllTime(res.data);
    });
  }, []);
  axios
    .get(
      "http://localhost:8086/appointment/appointmentExists/" + state.user.email,{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}
    )
    .then((res) => {
      if (res.data == true) {
        setBook(true);
      } else {
        setBook(false);
      }
    });

  useEffect(() => {
    axios
      .get("http://localhost:8081/patient/getpat/" + state.user.email,{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }})
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => {});
  }, [patient]);

  return (
    <>
      <div
        className="container appointment shadow-lg rounded"
        style={{ width: "80%", height: "150%" }}
      >
        <center className="display-4 pb-5 mb-5">
          <b style={{ color: "white" }}>Book an Appointment</b>
        </center>
        console.log(doctors)
        <div className="row">
          {allDoctors.map((doctor) => {
            return (
              <>
                <div className="col-md-4 mb-5">
                  <div
                    className="card h-100 rounded "
                    style={{ backgroundColor: "#F0F6F7" }}
                  >
                    <div className="card-body">
                      <h4 className="card-title">
                        <b>Dr. {doctor.doctor_name}</b>
                      </h4>
                      <hr />
                      <p className="card-text">
                        <b>Specialization : </b>
                        {doctor.specialization}
                      </p>
                      <p className="card-text">
                        <b>Doctor Email Address : </b>
                        {doctor.doctor_email_id}
                      </p>
                      <p className="card-text">
                        <b>Gender : </b>
                        {doctor.gender}
                      </p>
                      <p className="card-text ">
                        <b>Availablity : </b>
                        {doctor.availability}
                      </p>
                    </div>
                    <div className="card-footer" style={{ textAlign: "right" }}>
                      <select
                        onChange={handleTiming}
                        className="form-select form-select-lg text-center mb-5"
                        style={{
                          backgroundColor: "#f0f6f7",
                        }}
                        disabled={doctor.availability == "Not Available" || isBooked}
                      >
                        <option value="Select">Select Timings</option>
                        {getAllTime.map((time) => {
                          return (
                            <>
                              <option value={time.timingid} >
                                {time.appointmenttime}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      <input
                        type="button"
                        className={
                          isBooked
                            ? "btn btn-success btn-sm"
                            : "btn btn-info btn-sm"
                        }
                        value={isBooked ? "Registered" : "Book Appointment"}
                        disabled={doctor.availability == "Not Available" || isBooked}
                        id="id1"
                        onClick={(e) => {
                          e.preventDefault();
                          if (timings > 0) {
                            axios
                              .get(
                                "http://localhost:8086/appointment/time/" +
                                  timings +
                                  "/" +
                                  doctor.doctor_id,{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}
                              )
                              .then((res) => {
                                if (res.data <= doctor.appointment_count-1) {
                                  axios
                                    .post(
                                      "http://localhost:8086/appointment/add/" +
                                        doctor.doctor_id,
                                      {
                                        email: state.user.email,
                                        timings: new Date(),
                                        doctorid: doctor.doctor_id,
                                        patientid: patient.userid,
                                        timingid: timings,
                                      },{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}
                                    )
                                    .then(function (response) {
                                      alert("Appointment Registered");
                                      axios.get("http://localhost:8086/timing/"+timings,{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then(res=>{
                                        axios.post("http://localhost:8086/sendEmail",{"toEmail":patient.email,"subject":"Appointment Registration Successful","body":"Your Appointment is Registered and your approximate time is "+res.data.appointmenttime+" for Dr."+doctor.doctor_name+" ("+doctor.doctor_id+")"},{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).catch(function (error) {
                                          console.log(error);
                                        });
                                      })
                                     
                                      setBook(true);
                                    })
                                    .catch(function (error) {
                                      console.log(error);
                                    });
                                } else {
                                  alert("This slot is full choose another....");
                                }
                              });

                            setTiming("Select");
                          } else {
                            alert("Timing not selected...");
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
