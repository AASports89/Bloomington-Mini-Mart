import React from 'react';
import Navbar from './components/Navbar';
import favicon from './logo.svg';
import './App.css';
import Aos from 'aos';

function App() {

  Aos.init({duration:3000});
  const year = new Date().getFullYear();

  return(
            
    <div className="container-fluid">
       <Navbar />
  <footer id='footer' className=" fixed-bottom navbar navbar-expand-lg navbar-light bg-light">
  <div className='mx-auto'>
    <a id="icon-link" className="col px-5" href="https://aasports89.github.io/Costco-Roscoes-Liquor/">
      <img id="royal-icon" className='img-card-overlay' src={favicon} alt="Costco Roscoe's Liquor"></img>
    </a>
    <p className="mx-auto" id="footer-title"><b id="footer-bold">© Costco Roscoe's Gas & Liquor - {year}. All Rights Reserved.</b></p>
  </div>
</footer>
</div>
);
};

export default App;