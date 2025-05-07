import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import AllURLs from "./Components/AllURLs";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Contact from "./Components/Contact";
import Analytics from "./Components/Analytics";


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllURLs" element={<AllURLs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;