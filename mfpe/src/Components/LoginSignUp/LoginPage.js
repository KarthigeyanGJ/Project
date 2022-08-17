import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function LoginForm(props) {
  //let history = useHistory();
 
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [isLoggedIn, setLogInStatus] = useState(false);
  const [login,setLogin]=useState(false);
  const [store,setStore]=useState(null);
 const[token,setToken]=useState(null);
  const uservalue = (event) => {
    let n = event.target.name;
    let v = event.target.value;
    let eErr = "";
    let paErr = "";

    

    if (n === "email") {
      const regexExp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
      setEmail(v);

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

    setPassError(paErr);
    setEmailError(eErr);
  };
  const LoginHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/patient/authenticate",{"email":email,"password":password}).then((response)=>{localStorage.setItem('token',response.data.jwt); setToken(response.data.jwt);console.log(response.data.jwt)})
    axios.get("http://localhost:8081/patient/getpat/" + email,{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}` }})
      .then((result) => {
        console.log(result.data.email)
        if (
          result.data.email == email &&
          result.data.password == password &&
          result.data.email != "admin@gmail.com" &&
          result.data.password != "Admin@123"
        ) {
          dispatch({
            type: "USER",
            payload: { isAdmin: false, isLoggedIn: true, user: { email } },
          });
          setLogInStatus(true);
          navigate("/home");
        } else if (
          result.data.email == email &&
          result.data.password == password &&
          result.data.email === "admin@gmail.com"
        ) {
          dispatch({
            type: "USER",
            payload: { isAdmin: true, isLoggedIn: true, user: { email } },
          });
          setLogInStatus(true);
          navigate("/home");
        } else {
          dispatch({
            type: "USER",
            payload: { isAdmin: false, isLoggedIn: false, user: "" },
          });
          setLogInStatus(false);
        }
      });
  
  
  
    // fetch("http://localhost:8081/patient/getpat/" + email,{method:'GET',mode:'no-cors',headers:{'Access-Control-Allow-Origin': '*','Accept': '*/*',"Authorization": `Bearer ${localStorage.getItem('token')}` }}).then((res)=>{console.log(res.json())})
   /* fetch("http://localhost:8081/patient/getpat/" + email)
      .then((res) => res.json())
      .then((result) => {
        if (
          result.email == email &&
          result.password == password &&
          result.email != "admin@gmail.com" &&
          result.password != "Admin@123"
        ) {
          dispatch({
            type: "USER",
            payload: { isAdmin: false, isLoggedIn: true, user: { email } },
          });
          setLogInStatus(true);
          navigate("/home");
        } else if (
          result.email == email &&
          result.password == password &&
          result.email === "admin@gmail.com"
        ) {
          dispatch({
            type: "USER",
            payload: { isAdmin: true, isLoggedIn: true, user: { email } },
          });
          setLogInStatus(true);
          navigate("/home");
        } else {
          dispatch({
            type: "USER",
            payload: { isAdmin: false, isLoggedIn: false, user: "" },
          });
          setLogInStatus(false);
        }
      });*/

    setEmail("");
    setPassword("");
  };

  const LoginHandler1 =(e)=>{
    e.preventDefault();
   axios.post("http://localhost:8081/patient/authenticate",{"email":email,"password":password}).then((response)=>{localStorage.setItem('token',response.data.jwt)}
   )
  }
  return (
    <>
      <form>
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
                    <p
                      className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                      style={{ textShadow: " 2px 2px 2px #CCCCCC" }}
                    >
                      Log In
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="login_email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="login_email"
                            name="email"
                            value={email}
                            onChange={uservalue}
                            className="form-control"
                            placeholder="Enter your email id"
                            required
                          />
                          {emailError}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="login_pass">
                            Password
                          </label>
                          <input
                            type="password"
                            id="login_pass"
                            name="password"
                            value={password}
                            onChange={uservalue}
                            className="form-control"
                            placeholder="Enter password"
                            required
                          />
                          {passError}
                        </div>
                      </div>

                      <center>
                        <div className="justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-outline-info btn-lg mb-2"
                            onClick={LoginHandler}
                          >
                            Submit
                          </button>
                          <span className="d-block">
                            <p>
                              Not a member?
                              <Link to="/signup"> Sign up now..</Link>
                            </p>{" "}
                          </span>
                        </div>
                      </center>
                    </form>
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
