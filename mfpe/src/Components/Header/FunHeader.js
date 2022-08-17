import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import "../../CSS/style.css";
import "./header.css";
import hoslogo from "../../Images/hoslogo3.jpg";
import { UserContext } from "../../App";

function FunHeader(props) {
  const { state, dispatch } = useContext(UserContext);

  const [navbar1, setNavbar] = useState(false);
  const ManageLog = () => {
    dispatch({
      type: "USER",
      payload: {
        isAdmin: false,
        isLoggedIn: false,
      },
    });
  };

  const changeScroll = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeScroll);
  return (
    <nav
      className={
        navbar1
          ? "navbar active navbar-expand-md bg-dark navbar-dark p-sm-3 sticky-top .bg-gradient  "
          : "navbar  navbar-expand-md bg-dark navbar-dark p-sm-3 sticky-top .bg-gradient "
      }
      style={{
        fontWeight: 450,
        fontSize: 20,
        position: "fixed",
        width: "100%",
        display: "block",
      }}
    >
      <div className="container-fluid">
        <Link to="/home">
          <img src={hoslogo} style={{ height: 60, width: 60 }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex">
            <li
              className="nav-item "
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
              <Link
                to="/adminpanel"
                className={state.isAdmin ? "nav-link " : "nav-link d-none "}
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                Panel
              </Link>
            </li>

            <li
              className="nav-item "
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
              <Link
                to="/home"
                className="nav-link "
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                Home
              </Link>
            </li>
            <li
              className="nav-item "
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
              <Link
                to={state.isLoggedIn ? "/services" : "/login"}
                className="nav-link "
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                Services
              </Link>
            </li>
            <li
              className="nav-item "
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
              <Link
                to={state.isLoggedIn ? "/bed&blood" : "/login"}
                className="nav-link "
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                Blood&Beds
              </Link>
            </li>
            <li
              className="nav-item "
              style={{ paddingLeft: 30, paddingRight: 110 }}
            >
              <Link
                to={state.isLoggedIn ? "/home" : "/login"}
                className="nav-link "
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                {state.isLoggedIn ? state.user.email : "Login"}
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/home"
                className={state.isLoggedIn ? "nav-link " : "nav-link d-none "}
                onClick={ManageLog}
                aria-current="page"
                style={{ color: navbar1 ? "white " : "black" }}
              >
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default FunHeader;
