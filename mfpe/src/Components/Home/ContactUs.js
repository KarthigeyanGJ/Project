import React from "react";
import "./home.css";
import "../../CSS/style.css";

function ContactUs(props) {
  return (
    <div
      className="container mt-3 mb-5 shadow-lg border pb-5 "
      style={{ marginBottom: 20, backgroundColor: "cadetblue" }}
    >
      <p
        className="h1 d-flex justify-self-center text-center"
        style={{ paddingTop: 25, marginBottom: 60, marginLeft: "40%" }}
      >
        Contact Us
      </p>
      <hr />
      <div className="row">
        <div className="col-md-5 offset-md-1">
          <h2>
            Sanjivani Hospital Trust,
            <small className="text-muted"> Amravti</small>
          </h2>
          <p style={{ fontSize: 17 }} className="lead">
            336 Baker Strret California, In front on sys Square 342124
          </p>
          <p className="pt-4" style={{ fontSize: 20 }}>
            <strong>Email :</strong>{" "}
            <span className="lead">sanjivaniamt@gmail.com</span>
          </p>
          <p style={{ fontSize: 20 }}>
            <strong>Phone :</strong> <span className="lead">3452168235</span>
          </p>
          {/*<button
            type="button"
            className="btn btn-dark btn-lg d-block w-5"
            data-bs-toggle="modal"
            data-bs-target="#rateus"
            style={{ marginBottom: "10%", float: "left" }}
          >
            Rate Us
          </button>
          <div className="modal" id="rateus">
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#17a2b8", color: "white" }}
                >
                  <p className="h3">Rate Us</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="popup-container">
                      <div className="popup">
                        <center>
                          <div className="icons">
                            <label for="btn1">🙁</label>
                            <label for="btn2">😐</label>
                            <label for="btn3">😊</label>
                            <label for="btn4">😀</label>
                            <label for="btn5">😍</label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              name="button"
                              className="buttons"
                              value="1"
                              id="btn1"
                            />
                            <input
                              type="radio"
                              name="button"
                              className="buttons"
                              value="2"
                              id="btn2"
                            />
                            <input
                              type="radio"
                              name="button"
                              className="buttons"
                              value="3"
                              id="btn3"
                            />
                            <input
                              type="radio"
                              name="button"
                              className="buttons"
                              value="4"
                              id="btn4"
                            />
                            <input
                              type="radio"
                              name="button"
                              className="buttons"
                              value="5"
                              id="btn5"
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-info btn-sm">
                        Submit
                      </button>
                      <button type="submit" className="btn btn-info btn-sm">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>*/}
        </div>
        <div className="col-md-5 pt-5 pt-md-0">
          <iframe
            className="rounded border"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.8192738931157!2d77.74824023488769!3d20.9195895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4b13ef59ff3%3A0x44e4cf0fad78de3d!2sSanjivani%20Hospital!5e0!3m2!1sen!2sin!4v1655177351550!5m2!1sen!2sin"
            width="100%"
            height={350}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default ContactUs;
