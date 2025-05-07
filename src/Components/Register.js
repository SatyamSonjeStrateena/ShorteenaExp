import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] =  useState("");
  const [userName, setUserName] =  useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
  
    try {
      console.log("Full Name: ", fullName);
      console.log("User Name: ", userName);
      console.log("Email: ", email);
      console.log("Password: ", password);

      const userObject = { fullName, userName, email, password };
      console.log("userObject: " + userObject);
  
      // Send the list as root-level array
      const response = await axios.post("http://localhost:8080/api/auth/register", userObject);
  
      // Handle the list of returned short URLs
      if (response.data) {
        setFullName(response.data.fullName);
        setUserName(response.data.userName);
        setEmail(response.data.email);
        setPassword(response.data.password);
      }
      alert("User successfully saved in the database!!");
      navigate("/login");
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to register the user.");
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register for URL Shortener</h1>
      <p style={styles.subtitle}>
        Create your account to start shortening links.
      </p>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "40px 20px",
    maxWidth: 700,
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "1rem"
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#555",
    marginBottom: "2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#2F4F4F",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Register;
