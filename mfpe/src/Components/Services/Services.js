import React, { useEffect, useState } from "react";
import Serv from "../../Json/services.json";
import "../../CSS/style.css";

function Services(props) {
  const [services, setservices] = useState([]);
  const getServices = async () => {
    const response = await fetch("http://localhost:8085/services/getAll",{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }});
    setservices(await response.json());
  };
  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: "16%" }}>
      {services.map((service) => {
        return (
          <div
            className="container ser shadow rounded p-5 mb-5 px-5"
            style={{ marginTop: "70px" }}
          >
            <h1 className="display-5">{service.serviceName}</h1>
            <p className="lead">{service.serviceDesc}</p>
            <hr className="my-4" />
            <div className="row">
              <a
                href={service.link}
                target="_blank"
                className="btn btn-info  mb-2 col-sm-2"
                type="button"
              >
                Learn more
              </a>
              <div className="col-sm-8"></div>
              <div className="cl-sm-2">
                <p
                  className="text-dark text-right d-block"
                  style={{ float: "right", display: "block" }}
                >
                  <p>{service.available ? "is Available" : "Not Available"}</p>
                  Timings : <span>{service.timing}</span> <br></br>
                  Contact : <span>{service.phone}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Services;
