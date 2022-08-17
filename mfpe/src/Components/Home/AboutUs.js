import React from "react";
import "./home.css";
import aboutImg from "../../Images/about.jpg";

function AboutUs(props) {
  return (
    <div
      className="container mt-5 mb-5 shadow-lg border pb-5 rounded "
      style={{ marginBottom: 20, backgroundColor: "cadetblue" }}
    >
      <p
        className="h1 d-flex justify-self-center text-center"
        style={{ paddingTop: 25, marginBottom: 60, marginLeft: "40%" }}
      >
        About Us
      </p>

      <div className="row">
        <div className="col-md-5 offset-md-1 d-flex ">
          <img
            src={aboutImg}
            style={{ position: "relative", height: "100%", width: "100%" }}
          />
        </div>
        <div className="col-md-5 d-flex ">
          <p className="content mt-5">
            <span>
              Sanjeevani began its journey in 1999 with 9 beded hospital in
              Malad (east), western suburb of Mumbai and in short span of 2
              years as a result of excellent healthcare facilities &amp; hard
              work of Dr. Sunil Agrawal &amp; his team, no of beds were first
              increased to 21 in 2001 &amp; up to 25 in the year 2003.
            </span>
            <br />
            <br />
            <br />
            <span>
              Over the years hospital has acquired top of the line equipments
              and services of best of the brains in health care, which has
              helped Sanjeevani to increase its bed capacity to over 100 Rooms.
            </span>
            <br />
            <br />
            <br />
            <span>
              The name " SANJEEVANI " is inspired from the name of Dr. Sunil
              Agrawal’s mother &amp; also the life saving herb in Ayurveda.
            </span>
            <br />
            <br />
            <br />
          </p>
        </div>
        <div className="col-md-1 d-flex "></div>
      </div>
      <div className="container pt-4" style={{ marginTop: 50 }}>
        <div className="row justify-content-center">
          <div
            className="card text-bg-light col-md-4 mr-2 mb-3"
            style={{ maxWidth: "18rem", marginRight: 17, height: "15rem" }}
          >
            <div className="card-header">
              <i className="fa fa-solid fa-globe fa-4x" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Our Environment</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div
            className="card text-bg-light col-md-4 mb-3"
            style={{ maxWidth: "18rem", marginRight: 17, height: "15rem" }}
          >
            <div className="card-header">
              <i className="fa fa-handshake-o fa-4x" aria-hidden="true " />
            </div>
            <div className="card-body">
              <h5 className="card-title">Our Promise</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div
            className="card text-bg-light mb-3 col-md-4  "
            style={{ maxWidth: "18rem", marginRight: 17, height: "15rem" }}
          >
            <div className="card-header">
              <i className=" fa fa-solid fa-bullseye fa-4x" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div
            className="card text-bg-light mb-3 col-md-4 "
            style={{ maxWidth: "18rem", marginRight: 17, height: "15rem" }}
          >
            <div className="card-header">
              <i className="fa fa-thin fa-eye fa-4x" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Our Vision</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
