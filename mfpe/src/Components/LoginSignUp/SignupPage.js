import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import pic from "../../Images/signup.jpg";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
export default function SignupPage() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [name, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [phoneerror, setPhoneError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passerror, setPassError] = useState("");
  const [rpasserror, setRpassError] = useState("");
  const [patientsAll, setPatients] = useState("");
  const [gender, setGender] = useState("");
  const [isPresent, setStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/patient/getAllPatients")
      .then((res) => res.json())
      .then((result) => {
        setPatients(result);
        console.log("HI again");
      });
  }, [patientsAll]);

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleName = (e) => {
    setFullName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const uservalue = (event) => {
    let n = event.target.name;
    let v = event.target.value;
    let pErr = "";
    let eErr = "";
    let paErr = "";
    let rErr = "";
    if (n === "patient_phone_no") {
      setPhno(v);
      if (v !== "" && !Number(v)) {
        pErr = (
          <strong style={{ color: "red" }}>
            Invalid entry, Alphabets not allowed
          </strong>
        );
      } else if (v.toString().length != 10) {
        pErr = (
          <strong style={{ color: "red" }}>
            Enter the 10 digit phone number
          </strong>
        );
      }
    }
    if (n === "email") {
      setEmail(v);
      const regexExp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

      if (v !== "" && !regexExp.test(v)) {
        eErr = <strong style={{ color: "red" }}>Enter a valid email id</strong>;
      }
    }
    if (n === "password") {
      setPassword(v);
      if (v !== "" && v.toString().length < 8) {
        paErr = (
          <strong style={{ color: "red" }}>
            Enter valid password with atleast 8 characters
          </strong>
        );
      }
    }
    if (n === "rpassword") {
      setRpassword(v);
      let p1 = document.getElementById("signup_pass").value;
      if (v !== "" && p1 !== v) {
        rErr = (
          <strong style={{ color: "red" }}>
            Not matching with the password
          </strong>
        );
      } else if (p1 === v) {
        rErr = <strong style={{ color: "green" }}>Password Matching</strong>;
      }
    }

    setPhoneError(pErr);
    setEmailError(eErr);
    setPassError(paErr);
    setRpassError(rErr);
  };
  //("http://localhost:5001/patient/exists/"+email)
  //'http://localhost:5001/patient/add'
  const handleAddPatientClick = (e) => {
    e.preventDefault();
    const patients = {
      address,
      age,
      gender,
      password,
      email,
      name,
      phoneno,
    };
    console.log(patients);
    fetch("http://localhost:8081/patient/exists/" + email)
      .then((res) => res.json())
      .then((result) => {
        if (result == false) {
          fetch("http://localhost:8081/patient/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patients),
          }).then(() => {
            setStatus(true);
            alert("Patient Registered");
            axios.post("http://localhost:8086/sendEmail",{"toEmail":email,"subject":"Confirmation Mail","body":"Welcome to Online Medical Portal...."},{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }}).catch(function (error) {
              console.log(error);
            });
          });
          navigate("/login");
        } else {
          setStatus(false);
          alert("Patient already There");
        }
      });

    setEmail("");
    setPhno("");
    setPassword("");
    setRpassword("");
    setFullName("");
    setAddress("");
    setAge("");
    setGender("");

    console.log("Hi");
  };
  return (
    <>
      <form onSubmit={handleAddPatientClick}>
        <div
          className="container signup shadow-lg rounded"
          style={{ width: "80%", backgroundColor: "cadetblue" }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div
                  className="card-body p-md-5 rounded"
                  style={{ backgroundColor: "#F0F6F7" }}
                >
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_name">
                            Name
                          </label>
                          <input
                            type="text"
                            id="signup_name"
                            name="username"
                            className="form-control"
                            onChange={handleName}
                            value={name}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="signup_email"
                            name="email"
                            className="form-control"
                            onChange={uservalue}
                            value={email}
                            placeholder="Enter your email id"
                            required
                          />
                          {emailerror}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_address">
                            Address
                          </label>
                          <textarea
                            type="text"
                            id="signup_address"
                            name="address"
                            className="form-control"
                            placeholder="Enter your address"
                            onChange={handleAddress}
                            value={address}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" HtmlFor="signup_phone">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="signup_phone"
                            name="patient_phone_no"
                            pattern="[0-9]{10}"
                            onChange={uservalue}
                            value={phoneno}
                            className="form-control"
                            placeholder="Enter your phone number"
                            required
                          />
                          {phoneerror}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_age">
                            Age
                          </label>
                          <input
                            type="number"
                            id="signup_age"
                            name="age"
                            min={5}
                            max={150}
                            value={age}
                            onChange={handleAge}
                            className="form-control"
                            placeholder="Enter your age"
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_gender">
                            Gender
                          </label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              required
                              onChange={handleGender}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Male
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              required
                              onChange={handleGender}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Female
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="other"
                              value="other"
                              required
                              onChange={handleGender}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Other
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_pass">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="signup_pass"
                            className="form-control"
                            onChange={uservalue}
                            value={password}
                            placeholder="Enter password"
                            required
                          />{" "}
                          {passerror}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="signup_cpass">
                            Confirm password
                          </label>
                          <input
                            type="password"
                            id="signup_cpass"
                            name="rpassword"
                            onChange={uservalue}
                            value={rpassword}
                            className="form-control"
                            placeholder="Confirm Password"
                            required
                          />
                          {rpasserror}
                        </div>
                      </div>

                      <center>
                        <div className="justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-outline-info btn-lg mb-2"
                          >
                            Submit
                          </button>
                          <span className="d-block">
                            <p>
                              Already a member?<Link to="/login"> Login </Link>
                            </p>{" "}
                          </span>
                        </div>
                      </center>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={pic} className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
