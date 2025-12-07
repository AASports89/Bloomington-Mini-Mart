import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';
import logo from '../logo.svg';
import Aos from 'aos';

export default function Navbar() {
    
    useEffect(() => {
		Aos.init({duration:3000});
	}, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  // const navigate = useNavigate();

  const handleSubmit = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");

      var raw = JSON.stringify({
          email, password, name
      })

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://63b250a70d51f5b297272159.mockapi.io/api/v1/users", requestOptions)
          .then(response => response.text())
          // .then(result => navigate('/'))
          .catch(error => setError('Error '));
  }

  const handleEmailChange = (event) => {
      setEmail(event.target.value)
  }


  const handlePasswordChange = (event) => {
      setPassword(event.target.value)
  }

  const handleNameChange = (event) => {
      setName(event.target.value)
  }

  const [login, setLogin] = useState(false);
  const closeLogin = () => setLogin(false);
  const showLogin = () => setLogin(true);

    return (
		<div className="col-12">
      <header id='header' className="navbar navbar-expand-lg navbar-light bg-light">
        <a className='img-card-overlay' id="logo-over" href='https://aasports89.github.io/Costco-Roscoes-Liquor'>
          <img id='logo' src={logo} className="card-img" alt="logo"  data-aos="slide-right"/>
        </a>
        <div className="col-10">
        <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
          <a id='home' data-aos="flip-right" className="accordion nav-link active" href='/'>
            <i id='home-icon' className="fa-solid fa-house"></i> 
            Home
          </a>   
          <a id='resources' data-aos="flip-right" className="accordion nav-link active" href="/resources">
            <i id='resources-icon' className="fa-brands fa-sourcetree"></i>
            Inventory
          </a>
          <a data-aos="flip-right" id='login' className="accordion nav-link active" onClick={showLogin} href='#'>
              <i id='login-icon' className="fa-solid fa-user"></i>
                  Log In
          </a>
          </nav>
          </div>
        </header>

  <Modal variant="modal fade" show={login} onHide={closeLogin}>
          <form id="signupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={handleSubmit}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <Modal.Header>
                            <h2 id='signupHeader' className="modal-title mx-auto"><i className="fa-solid fa-user"></i> Log In </h2>
                        </Modal.Header>
                    <Modal.Body>
                    <div className='row justify-content-center'>
                        <label htmlFor="inputEmail" className="sr-only"><i class="fa-solid fa-square-envelope"></i> E-mail Address</label>
                        <input type="email" id="inputEmail" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email address" required autoFocus />
                    </div>
                    <div className='row justify-content-center'>
                        <label htmlFor="inputPassword" className="sr-only"><i class="fa-solid fa-key"></i> Password</label>
                        <input type="password" id="inputPassword" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" required />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id='signup-btn' variant="primary mx-auto" onClick={closeLogin}>Log In</Button>
                        <Button id='back-btn' variant="primary mx-auto" onClick={closeLogin}>Cancel</Button>
                    </Modal.Footer>
                    {error && <div className='error'>{error}</div>}
            </div>
        </div>
    </form>
  </Modal>
</div>
)};