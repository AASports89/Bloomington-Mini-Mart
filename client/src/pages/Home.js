import React from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import favicon from '../images/favicon.svg';
import DriverLog from './DriverLog.js';
import "../App.css"

const Home = () => {

  const year = new Date().getFullYear();

  return (
    <Container>
      <DriverLog />
        <footer id='footer' className="fixed-bottom navbar navbar-expand-lg navbar-light bg-light justify-content-center">
          <ul class="nav justify-content-center">
            <a id="icon-link" className="nav item justify-content-center" href="https://aasports89.github.io/Costco-Roscoes-Liquor/">
              <img id="royal-icon" className='img-card-overlay' src={favicon} alt="Costco Roscoe's Liquor"></img>
            </a>
             <p className="nav item justify-content-center" id="footer-title"><b id="footer-bold">© Shell Gas Retail - {year}. All Rights Reserved.</b></p>
          </ul>
        </footer>
    </Container>
  )
}

export default Home