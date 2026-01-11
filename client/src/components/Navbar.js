import React from "react";
import { useEffect, useContext } from "react";
// import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container.js';
import { useNavigate } from "react-router-dom";
import { appContext } from "../context/appContext.js";
import axios from "axios";
import { toast } from "react-toastify";
import Aos from "aos";
// import { useState } from "react";
import logout_icon from '../images/logout.svg';
import login_icon from '../images/login.svg';
import nav_logo from '../images/nav_logo.svg';
import DriverLog from '../pages/DriverLog.js';
import "../index.css";
import "../App.css"

const Navbar = () => {

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

  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false); // For btn to be disabled after submitting

  // const sendVerificationOtp = async () => {
  //   setIsSubmitting(true);
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const { data } = await axios.post(
  //       backendUrl + "/api/auth/send-verify-otp"
  //     );
  //     if (data.success) {
  //       navigate("/email-verify");
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const { data, backendUrl, setIsLoggedin, setUserData } =  useContext(appContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Container>
      {" "}
        {data? (
            <button onClick={logout} className="btn cursor-pointer" id="logout-btn" data-bs-toggle="modal" data-bs-target="#logout-card">
				      <img id="logout_icon" src={logout_icon} className="card-img-top mx-auto" alt="Logout"></img> LOGOUT
              {data.username[0].toUpperCase()}
			      </button>
          ):(
          <div class="container fluid" id="login-div">
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
              <a id="btn-home" className="navbar-brand" onClick={() => navigate("/")}>
     			      <img id="shell-logo" data-aos="slide-right" src={nav_logo} className="card-img-top mx-auto" alt="Shell Gas™"></img>
			        </a>
                {/* <button id="logs-btn" data-aos="slide-left" className="btn-style nav-item nav-link" type="button" data-bs-toggle="modal" onClick={() => navigate("/driverLogs")}>
				          DRIVER <img id="tips_icon" src='https://res.cloudinary.com/dhqsixgmo/image/upload/v1765664437/log_actmp7.svg' className="card-img-top mx-auto" alt="Driver Logs"></img>
			              </button> 
                */}
            </nav>
              <button id="login-btn" data-aos="slide-right" className="nav item" type="button" data-bs-toggle="modal" onClick={() => navigate("/login")}>
				        <img id="login_icon" src={login_icon} className="card-img-top mx-auto" alt="Login"></img> ADMIN LOGIN
			        </button>
          </div>
          )}
    </Container>
  )};

export default Navbar;
