import "./App.css";
import Dashboard from "./templates/dashboard/Dashboard";
import UnderConstruction from "./templates/dashboard/UnderConstruction";
import SwipeCards from "./templates/dashboard/SwipeCards";
import UploadForm from "./templates/dashboard/UploadForm";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom"; // Import necessary routing components

function App() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/uscensus")
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Default route for Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Route for SwipeCards */}
        <Route path="/upload-key-visual" element={<UploadForm />} />
        <Route path="/key-visual" element={<SwipeCards />} />

        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/ad-analytics" element={<UnderConstruction />} />
        <Route path="/campaigns" element={<UnderConstruction />} />
        <Route path="/ad-adjustments" element={<UnderConstruction />} />

        <Route path="/settings" element={<UnderConstruction />} />
        <Route path="/about" element={<UnderConstruction />} />
        <Route path="/feedback" element={<UnderConstruction />} />
        {/* Redirect to Dashboard for any other path */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
