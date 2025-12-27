import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import "aos/dist/aos.css";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
reportWebVitals();