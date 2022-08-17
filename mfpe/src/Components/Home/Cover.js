import React, { useContext } from "react";
import "./home.css";
import "../../CSS/style.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Cover(props) {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className="masthead">
      <div className="color-overlay1 d-flex justify-content-center align-items-center d-block">
        <div className="HomeCap d-inline">
          <h1 className="cap1 display-3 ">
            We Try to make Your Life better{" "}
            <span className="d-lg-block">and Easier </span>
          </h1>
        </div>
      </div>
      <div className="color-overlay d-flex justify-content-center align-items-center d-block">
        <div className="HomeBut d-inline">
          <Link
            to={state.isLoggedIn ? "/bookappointment" : "/login"}
            className="color-info"
            style={{ textDecoration: "none" }}
          >
            <button
              className="btn btn-info  mb-2 btn-lg"
              style={{ marginRight: "20px" }}
            >
              Book Appointment
            </button>
          </Link>
          <Link
            to={state.isLoggedIn ? "/ambulanceservice" : "/login"}
            className="color-info"
            style={{ textDecoration: "none" }}
          >
            <button className="btn btn-info  mb-2  btn-lg">
              Book Ambulance
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cover;
