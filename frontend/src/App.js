import "./App.css";
import Dashboard from "./templates/dashboard/Dashboard";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h1>{tests}</h1>
      <Dashboard />
    </div>
  );
}

export default App;
