import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/appContext.js";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
  </BrowserRouter>
);