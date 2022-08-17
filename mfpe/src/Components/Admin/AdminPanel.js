import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function AdminPanel(props) {
  const [bedType, setBedType] = useState("");
  const [bedCount, setBedCount] = useState("");
  const [allDoctors, setAllDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [bloodCount, setBloodCount] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [appointmentCount,setAppointmentCount] =useState();

  const [ambCount, setAmbCount] = useState("");
  const AmbSubmitHandler = (e) => {
    console.log(ambCount);
    props.onSaveAmbCount(ambCount);
    setAmbCount("");
  };
  const BloodOptionChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const BloodCountChange = (e) => {
    setBloodCount(e.target.value);
  };
  const bloodCountChange = (e) => {
    setBloodCount(e.target.value);
  };
  const bloodTypeChange = (e) => {
    setBloodType(e.target.value);
  };

  const ambCountChange = (e) => {
    setAmbCount(e.target.value);
  };

  const BedOptionChange = (e) => {
    setBedType(e.target.value);
  };
  const BedCountChange = (e) => {
    setBedCount(e.target.value);
  };

  const BedSubmitHandler = () => {
    console.log(bedType + bedCount);
    fetch("http://localhost:8083/bed/update/" + bedType + "/" + bedCount, {
      method: "PUT",headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }
    });

    setBedCount("");
  };
  const BloodSubmitHandler = () => {
    fetch(
      "http://localhost:8083/blood/update/" + bloodGroup + "/" + bloodCount,
      { method: "PUT",headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` } }
    );

    setBloodCount("");
  };
  useEffect(() => {
    axios.get("http://localhost:8082/doctor/getAllDoctors",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setAllDoctors(res.data);
    });

    axios
      .get("http://localhost:8086/appointment/getAllAppointments",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }})
      .then((res) => {
        setAppointment(res.data);
      });
  });

  const handleEvent1 = (e, num) => {
    e.preventDefault();
    console.log(num + " " + e.target.value);
    fetch("http://localhost:8082/doctor/update/" + num + "/" + e.target.value, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(num, e.target.value),
    }).then(() => {});
  };

  return (
    <div>
      <br />
      <br />

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 table-responsive" style={{ marginTop: "10%" }}>
          <table className="table table-bordered table-success table-striped">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Service</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tr></tr>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Doctor</td>
                <td>
                  <button
                    className="btn btn-outline-info"
                    data-bs-toggle="modal"
                    data-bs-target="#updatedocstatus"
                  >
                    Update
                  </button>

                  <div className="modal " id="updatedocstatus">
                    <div className="modal-dialog modal-xl" >
                      <div className="modal-content">
                        <div
                          className="modal-header"
                          style={{ backgroundColor: "#17a2b8", color: "white" }}
                        >
                          <p className="h3">Update Doctor Status</p>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table table-bordered table-success table-striped" >
                            <thead>
                              <tr>
                                <th scope="col">Doctor Id</th>
                                <th scope="col">Is Available</th>
                                <th scope="col">Appointment Count</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allDoctors.map((doctor) => {
                                return (
                                  <tr>
                                    <th scope="row" value={doctor.doctor_id}>
                                      {doctor.doctor_id}
                                    </th>
                                    <td>
                                      <select
                                        onChange={(e) => {
                                          e.preventDefault();

                                          fetch(
                                            "http://localhost:8082/doctor/update/" +
                                              doctor.doctor_id +
                                              "/" +
                                              e.target.value,
                                            {
                                              method: "POST",
                                              headers: {
                                                "Content-Type":
                                                  "application/json","Authorization": `Bearer ${localStorage.getItem('token')}`
                                              },
                                              body: JSON.stringify(
                                                doctor.doctor_id,
                                                e.target.value
                                              ),
                                            }
                                          ).then(() => {});
                                        }}
                                        className="form-select form-select-sm text-center"
                                        style={{
                                          backgroundColor: "#f0f6f7",
                                          width: "50%",
                                        }}
                                      >
                                        <option>Select..</option>
                                        <option value="Is Available">
                                          Yes
                                        </option>
                                        <option value="Not Available">
                                          No
                                        </option>
                                      </select>
                                    </td>
                                    <td>
                                      <form onSubmit={(e)=>{e.preventDefault();alert("Appointment Count Updated")}}>
                     
                                      <input type="number"  required onChange={(e)=>{
                                        
                                      axios.post("http://localhost:8082/doctor/updatecount/"+doctor.doctor_id,{appointment_count:e.target.value},{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then(setAppointmentCount(''));}}/> 
                                      <input type="submit" value="update"  className="btn btn-info btn-sm " style={{marginLeft:"10px"}}  />
                                   </form>   
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="modal-footer"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Bed,Blood and Ambulance</td>
                <td>
                  <button
                    className="btn btn-outline-info"
                    data-bs-toggle="modal"
                    data-bs-target="#updatebba"
                  >
                    Update
                  </button>
                  <div className="modal" id="updatebba">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div
                          className="modal-header"
                          style={{ backgroundColor: "#17a2b8", color: "white" }}
                        >
                          <p className="h3">Update Doctor Status</p>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table table-bordered table-success table-striped">
                            <thead>
                              <tr>
                                <th scope="col">Service</th>
                                <th scope="col">Type</th>
                                <th scope="col">count</th>
                                <th scope="col">Submit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>

                                <td>
                                  <select
                                    class="form-select form-select-sm text-center"
                                    style={{
                                      backgroundColor: "#f0f6f7",
                                    }}
                                    onChange={BloodOptionChange}
                                  >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>

                                    <option value="B-">B-</option>

                                    <option value="B+">B+</option>

                                    <option value="O+">O+</option>

                                    <option value="O-">O-</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bloodcnt"
                                    placeholder="Blood Count"
                                    onChange={BloodCountChange}
                                    value={bloodCount}
                                  />
                                </td>
                                <td>
                                  {" "}
                                  <button
                                    type="submit"
                                    className="btn btn-info btn-sm"
                                    onClick={BloodSubmitHandler}
                                  >
                                    Submit
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>
                                  <select
                                    class="form-select form-select-sm text-center"
                                    style={{
                                      backgroundColor: "#f0f6f7",
                                    }}
                                    onChange={BedOptionChange}
                                  >
                                    <option selected value="Ventillator">
                                      Ventillator
                                    </option>
                                    <option value="General">General</option>
                                    <option value="Oxygen">Oxygen</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bedcnt"
                                    value={bedCount}
                                    placeholder="Bed Count"
                                    onChange={BedCountChange}
                                  />
                                </td>
                                <td>
                                  <button
                                    type="submit"
                                    className="btn btn-info btn-sm"
                                    onClick={BedSubmitHandler}
                                  >
                                    Submit
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td></td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bedcnt"
                                    value={ambCount}
                                    onChange={ambCountChange}
                                    placeholder="Ambulance Count"
                                  />
                                </td>
                                <td>
                                  {" "}
                                  <button
                                    type="submit"
                                    className="btn btn-info btn-sm"
                                    onClick={AmbSubmitHandler}
                                  >
                                    Submit
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Service</td>
                <td>
                  <Link to="/serviceupdate">
                    <button className="btn btn-outline-info">Update</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="com-md-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <span style={{ marginRight: "5px" }}>
            <button
              className="btn btn-sm btn-outline-info"
              onClick={() => {
                axios
                  .delete("http://localhost:8086/appointment/deleteAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }})
                  .then(alert("Database refreshed"));
              }}
            >
              Refresh
            </button>
          </span>
          <span>
            <button
              className="btn btn-sm btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#showAppointments"
            >
              Appointments
            </button>
          </span>
          <div className="modal " id="showAppointments">
            <div className="modal-dialog " style={{ width: "200%" }}>
              <div className="modal-content" style={{ width: "100%" }}>
                <div
                  className="modal-header"
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <p className="h3">Appointment Details</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body " style={{ overflowX: "auto" }}>
                  <table className="table table-bordered table-success table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Timings</th>
                        <th scope="col">TimId</th>
                        <th scope="col">DocId</th>
                        <th scope="col">PatId</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointment.map((appointments) => {
                        return (
                          <tr>
                            <td className="col">
                              {appointments.appointment_id}
                            </td>
                            <td className="col">{appointments.email}</td>
                            <td className="col">{appointments.timings}</td>
                            <td className="col">{appointments.timingid}</td>
                            <td className="col">{appointments.doctorid}</td>
                            <td className="col">{appointments.patientid}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default AdminPanel;
