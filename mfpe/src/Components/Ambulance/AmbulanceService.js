import React, { useEffect } from "react";
import "./AmbulanceService.css";
import axios from "axios";
import { useState } from "react";
export default function AmbulanceService(props) {
  const [ambulance, setAmbulance] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8085/ambulance/getAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then((res) => {
      setAmbulance(res.data);
    });
  });

  return (
    <div
      className="container ambulance shadow-lg rounded"
      style={{
        width: "80%",
        height: "150%",
        backgroundColor: "cadetblue",
        backgroundImage: "url(${pic})",
      }}
    >
      <center className="display-3 pb-5 mb-5">
        <b>Hospital Ambulance Service</b>
      </center>
      <div className="row">
        <div className="col-md-2"></div>
        <div
          className="card text-center col-md-8 rounded shadow-lg rounded"
          style={{ paddingBotton: "1%" }}
        >
          <div className="card-body available ">
            <p className="card-title display-5">
              Ambulance Available In Hospital
            </p>
            <span className="display-3">{props.count}</span>
          </div>
          <div className="card-footer d-flex" style={{ float: "left" }}>
            <blockquote className="caption">
              {" "}
              <i class="fa fa-mobile fa-4x" aria-hidden="true"></i>{" "}
              <b>9856421256</b>
            </blockquote>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
      <center className="display-3 pb-2 mb-2 pt-5 mt-5 pb-5 mb-5">
        <b>Other Ambulance Details</b>
      </center>
      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ MarginTop: "5%" }}
      >
         {ambulance.map((ambulances) => {
            return (
              <>
        <div className="col ">
         
                <div className="card h-100 rounded shadow-lg ">
                  <div className="card-body">
                    <center>
                      <h3 className="card-title pb-3">{ambulances.driver_name}</h3>
                    </center>
                    <h4 className="card-text pb-3">Driver Details: </h4>

                    <div className="d-block">
                      <p className="d-block">
                        Address : <span className="amb_address ">{ambulances.address}</span>
                      </p>
                      <p className="d-block">
                        Availability : <span className="amb_availability">{ambulances.isAvailable}</span>
                      </p>
                      <p className="d-block">
                        Ambulance Number :{" "}
                        <span className="amb_addr ">{ambulances.ambulance_no}</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <blockquote className="caption">
                      {" "}
                      <i class="fa fa-mobile fa-4x" aria-hidden="true"></i>{" "}
                      <b>{ambulances.phone_no}</b>
                    </blockquote>
                  </div>
                </div>
            
        </div>
        </>
            );
          })}
      </div>
    </div>
  );
}
