import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] =  useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
    if (!userName.trim() || !password.trim()) return;
  
    try {
      console.log("User Name: ", userName);
      console.log("Password: ", password);

      const userObject = { userName, password };
      console.log("userObject: " + userObject);
  
      // Send the list as root-level array
      const response = await axios.post("http://localhost:8080/api/auth/login", userObject);
  
      // Handle the list of returned short URLs
      if (response.data) {
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        setUserName(response.data.userName);
        setPassword(response.data.password);
        navigate("/");
      }
      alert("User successfully logged in.");
    } catch (error) {
      console.error("Failed to login. Please try again.", error);
      alert("Failed to login. Please try again.");
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login if Already Registered</h1>
      <p style={styles.subtitle}>
        Enter your Username and Password.
      </p>

      <div style={styles.inputGroup}>
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
        <button onClick={handleLogin} style={styles.button}>
          Login
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
    marginBottom: "9rem"
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

export default Login;
