import React, { useEffect } from "react";
import { User, router } from '../utils/index.js';
import Aos from "aos";
import SmoothScrollTo from "../utils/smoothScrollTo.js";
import '../App.css'; 
import Auth from '../utils/auth.js';

const Navbar = (props) => {

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

			router.post('/login', async(req, res) => {
			try {
				const { username, password } = req.body;
				const user = await User.findOne({ username: username });
				
				if (!user)
						return res.status(500).json({
							message: "Error❗⛔ " + user.username + " does NOT exist❗⛔",
							type: "error",
							resolve: require.resolve('assert/', 'stream-browserify'),
						});
						
						const isMatch = await User.userSchema.methods.isCorrectPassword(password, user.password);
						if (!isMatch)
							return res.status(500).json({
								message: "Error❗⛔ " + user.username + ", has invalid login password❗⛔",
								type: "error",
							});
							
							const refreshToken = Auth.authMiddleware(user._id);
							const accessToken = Auth.signToken(user._id);
					
							user.refreshToken = refreshToken;
							await User.userSchema.pre();
							
							Auth.authMiddleware(res, refreshToken);
							Auth.signToken(req, res, accessToken);
						
						} catch (error) {
							res.status(500).json({
								type: "error",
								message: "Error❗⛔ Invalid login❗⛔",
							});
						}
					});
			
return (
		<div>
			<nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<button id="btn-home" className="home-style navbar-brand"
						onClick={() => {
							window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
						}}>
     					<img src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1765103972/liquor_bg_lukw3q.svg" id="nav" class="card-img-top mx-auto" alt="Costco Roscoe's Gas & Liquor"></img>
					</button>
						<div className="navbar-nav">
						
							<button id="login-btn" onClick={() => SmoothScrollTo("exampleModal")} className="btn-style nav-item nav-link" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
  								ADMIN LOGIN
							</button>

						<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  							<div className="modal-dialog">
    					<div className="modal-content">
      						<div className="modal-header">
        				<h5 className="modal-title" id="exampleModalLabel">ADMIN LOGIN</h5>
        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      				</div>
      				<div className="modal-body">
						<form action="/auth" method="post" className="content-containers container text-center mt-5">
						<div className="input-group" id="login-un">
							<label for="username"><i class="fas fa-user"></i></label>
							<input
							id="username"
                  			className="form-control"
                  			placeholder="Username"
							name="username"
                  			type="text"
                			required />
						</div>
                		
						<div className="input-group" id="login-pw">
							<label for="password"><i class="fas fa-lock"></i></label>
							<input
							id="password"
                  			className="form-control"
                  			placeholder="******"
                  			name="password"
                  			type="password"
                			required />
							<input type="submit" value="Login" />
						</div>
						
				<div className="modal-footer">
					<button type="submit" className="btn btn-primary" style={{ cursor: 'pointer' }}>Login</button>
        			<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      			</div>
								
              		</form>
      				</div>
    		</div>
  		</div>
		</div>
								

		<button id="logs-btn" onClick={() => SmoothScrollTo("exampleModal1")} className="btn-style nav-item nav-link" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">
  			ENTER DRIVER [<img id="tips_icon" src='https://res.cloudinary.com/dhqsixgmo/image/upload/v1765664437/log_actmp7.svg' class="card-img-top mx-auto" alt="Driver Logs" />]
		</button>

<div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="card-img-overlay" id='tips_title'>DRIVER <img id="tips_icon" src='https://res.cloudinary.com/dhqsixgmo/image/upload/v1765664437/log_actmp7.svg' class="card-img-top mx-auto" alt="Driver Logs" /></h5>
        	<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      	</div>
      				<div className="modal-body-justify-content-center" id="embed-1">
       					<form className="content-containers container text-center mt-5" id='purpose_row'>
		                  
                        	<label for="validationDefaultUsername" className="form-label"><b>Driver ID</b></label>
                          		<div className="input-group" id="input-log">
                            		<span className="input-group-text" id="inputGroupPrepend2">ID-</span>
                            		<input type="text" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" placeholder='Driver ID' required />
                          		</div>

    		                <label for="validationDefault01" className="form-label"><b>Total Gallons</b></label>
                        		<div className="input-group" id="input-log">
                          			<span className="input-group-text" id="inputGroupPrepend2">#</span>
    		                  		<input type="text" className="form-control" id="validationDefault01" placeholder='0' required />
                        		</div>
  		               
  		                
    		                <label for="validationDefault02" className="form-label"><b>Total Cost</b></label>
                        		<div className="input-group" id="input-log">
                          			<span className="input-group-text" id="inputGroupPrepend2">$</span>
    		                  		<input type="text" className="form-control" id="validationDefault02" aria-describedby="inputGroupPrepend2" placeholder="0.00" required />
                        		</div>
  		                
                    		<div class="modal-footer">
								<button button type="submit" className="btn btn-primary" style={{ cursor: 'pointer' }}>Submit Log</button>
        						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      						</div>
	                	</form>

      </div>
    </div>
  </div>
</div>
<div>
    </div>
						</div>
					</div>
			</nav>			
		</div>
)};

export default Navbar;