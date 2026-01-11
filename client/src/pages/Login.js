import React, { useEffect, useContext, useState } from "react";
import Container from 'react-bootstrap/esm/Container.js';
import { useNavigate } from "react-router-dom";
import { appContext } from "../context/appContext.js";
import axios from "axios";
import { toast } from "react-toastify";
import Aos from "aos";
// import nav_logo from '../images/nav_logo.svg';
// import login_icon from '../images/login.svg';
// import "../index.css";
import "../App.css";

const Login = () => {

  	useEffect(() => {
		Aos.init({duration:2000});
		window.addEventListener("scroll", () => {
			var navBar = document.getElementById("navbar");
			var domRect = navBar.getBoundingClientRect();

			if (domRect.y <= -domRect.height) {
				navBar.classList.add("fade-in-nav");
			}
		});
	}, [])

  const { backendUrl, setIsLoggedin, getUserData } = useContext(appContext);

  const [state, setState] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const [setIsSubmitting] = useState(false); // For btn to be disabled after submitting

  const navigate = useNavigate();

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault(); // It will stop from reloading the page after submit
      setIsSubmitting(true); // btn disabled

      axios.defaults.withCredentials = true; // It will send the cookie

      if (state === "Login") 
      {
        setState("Login");
       const { data } = await axios.post(backendUrl + "/api/auth/login", {
          username,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/driverLogs");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      // setIsSubmitting(false);
    }
  };
   
  return (
  <Container>
<div className="modal-dialog" id="login_modal">
			  <div className="modal-content">
				  <div className="modal-header">
					  <h5 className="modal-title" id="exampleModalLabel">Shell™ Gas Retail: <i>ADMIN LOGIN</i></h5>
            <button type="button" id="btn-close" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={navigate("/")}>
              <span aria-hidden="true">&times;</span>
            </button>
				  </div>
				<div className="modal-body" id="login-modal">
        <p className="text-center text-sm mb-6 text-indigo-800">
          {state === "Login"
            ? ""
            : ""}
        </p>
					<form className="content-containers container text-center mt-5" onSubmit={onsubmitHandler}>
            <div className="input-group" id="login-un">
                <label id="un_label" htmlFor="username"><i id="un_icon" className="fas fa-user"></i></label>
								<input onChange={(e) => setName(e.target.value)} value={username} id="username" className="form-control" placeholder="Username" name="username" type="text" required/>
						</div>
            <div className="input-group" id="login-pw">
                <label id="pw_label" htmlFor="password"><i id="pw_icon" className="fas fa-lock"></i></label>
								<input onChange={(e) => setPassword(e.target.value)} value={password} id="password" className="form-control" placeholder="******" name="password" type="password" required/>
						</div>
						<div className="modal-footer">
								<button type="submit" id="pw_login" className="btn btn-primary" style={{cursor: 'pointer'}}>
									Login
								</button>
                <a id="close-btn" class="btn btn-secondary" onClick={navigate("/")}>
                  Close
                </a>
                {state}
            </div>

          </form>
        </div>
      </div>
    </div>
</Container>
)};

export default Login;