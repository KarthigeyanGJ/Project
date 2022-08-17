import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hoslogo from "../../Images/hoslogo3.jpg"
import "../../CSS/style.css"

export class Footer extends Component {
    render() {
        return (
            <footer>
            <div className="container-fluid text-center">
              <div className="m-auto align-item-center pt-4 pb-4">
             
                <img src={hoslogo} style={{ height: 80, width: 80 }} />
                
                <ul style={{ listStyleType: "none" }}>
                  <li className="display-4">Breach Candy Hospital</li>
                  <li style={{ fontSize: 20 }}>60-A Bhulabhai Desai Road</li>
                  <li style={{ fontSize: 20 }}>Pune - 411048</li>
                </ul>
                <div className="row grid">
                  <div className="col-4" />
                  <div className="col-4">
                    <div className="row">
                      <div className="col-md-3">
                        <a
                          href="https://www.facebook.com"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <i className="fa fa-facebook" />
                        </a>
                      </div>
                      <div className="col-md-3">
                        <a
                          href="https://twitter.com"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <i className="fa fa-twitter" />
                        </a>
                      </div>
                      <div className="col-md-3">
                        <a
                          href="https://instagram.com"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <i className="fa fa-instagram" />
                        </a>
                      </div>
                      <div className="col-md-3">
                        <a
                          href="https://hospital.com"
                          title=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <i className="fa fa-link" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-4" />
                </div>
                <br />
                <span>2367-2888 </span>
                <span>info@breachcandyhospital.org</span>
                <hr />
                <div className="container-fluid footer">
                  <div className="footer-copyright text-center">
                    © 2020 Copyright:
                    <a href="/" style={{ textDecoration: "none", color: "black" }}>
                      xyzhospital.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          
        );
    }
}

