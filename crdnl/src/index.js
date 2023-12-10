import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "js/home-page";

import "css/styles.css";
import reportWebVitals from "./reportWebVitals";

function App() {
  const url_params = new URLSearchParams(window.location.search);

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage backend_port={url_params.get("backend_port")}/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
