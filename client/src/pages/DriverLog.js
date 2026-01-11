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

  const [state, setState] = useState('');
  const [driverID, setDriverID] = useState('');
  const [total_filled, setTotalFilled] = useState('');
  const [total_cost, setTotalCost] = useState('');

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
          driverID,
          total_filled,
          total_cost
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
            <h5 className="modal-title" id="exampleModalLabel">Shell™ Gas Retail: <i>DRIVER LOGS</i></h5>
        <button type="button" id="btn-close" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={navigate("/")}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
<div className="modal-body" id="login-modal">
     <form className="content-containers container text-center mt-5" onSubmit={onsubmitHandler}>
            <div className="input-group" id="login-un">
                <label id="un_label" htmlFor="driverID"><i id="driver_icon" class="fa-solid fa-id-card"></i></label>
                <input value={driverID} id="driverID" className="form-control" placeholder="ID-0000" name="driverID" type="text" required/>
            </div>
            <div className="input-group" id="login-pw">
                <label id="pw_label" htmlFor="total_filled"><i id="fill_icon" class="fa-solid fa-gas-pump"></i></label>
                <input value={total_filled} id="total_filled" className="form-control" placeholder="0" name="total_filled" type="text" required/>
            </div>
            <div className="input-group" id="login-pw">
                <label id="pw_label" htmlFor="total_cost"><i id="cost_icon" class="fa-solid fa-dollar-sign"></i></label>
                <input value={total_cost} id="total_cost" className="form-control" placeholder="$0.00" name="total_cost" type="text" required/>
            </div>
            <div className="modal-footer">
                <button type="submit" id="pw_login" className="btn btn-primary" style={{cursor: 'pointer'}}>
                    Submit
                </button>
                <a id="close-btn" class="btn btn-secondary" onClick={navigate("/")}>
                  Close
                </a>
            </div>
          </form>
        </div>
      </div>
    </div>
</Container>
)};

export default Login;