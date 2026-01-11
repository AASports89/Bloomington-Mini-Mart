import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Navbar from './components/Navbar.js';
import "./App.css";
// import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <Container>
      {/* <ToastContainer/> */}
        <header id="navbar" className='navbar navbar-expand-lg navbar-light bg-light justify-content-center'>
          <Navbar />
        </header>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
    </Container>
  )
}

export default App