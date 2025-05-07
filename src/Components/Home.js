import React, { useState } from "react";
import axios from "axios";
import "../Home.css";
 
const UrlShortener = () => {
  const [fullURL, setFullURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [bulkUrls, setBulkUrls] = useState([]);
  const [bulkShortened, setBulkShortened] = useState([]);
  const token = sessionStorage.getItem("token");
 
 
const handleShorten = async () => {
  if (!fullURL.trim()) return;
 
  try {
    const urlObject = { fullURL };
 
    // Add to a local array (not stateful for now)
    const bulkList = [urlObject];
 
    console.log("Sending list:", bulkList);
 
    // Send the list as root-level array
    const response = await axios.post("http://localhost:8080/shorten", bulkList, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
 
    // Handle the list of returned short URLs
    if (response.data && response.data.length > 0) {
      setShortURL(response.data[0].shortURL);
      alert("URL successfully shortened!!!");
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
    alert("Failed to shorten URL. Please Register/Log In.");
  }
};
 
const handleDownload = () => {
  const headers = ["Full URL", "Shortened URL"];
  const rows = bulkShortened.map(item => [item.fullURL, item.shortURL]);
 
  const csvContent = [
    headers.join(","), // Header row
    ...rows.map(row => row.map(value => `"${value}"`).join(",")) // Escape values
  ].join("\n");
 
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
 
  const link = document.createElement("a");
  link.href = url;
  link.download = "shortened_urls.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 
  URL.revokeObjectURL(url);
};
 
const handleEmailSend = async () => {
  const userEmail = prompt("Enter your email address:");
  if (!userEmail) return;

  const payload = {
    email: userEmail,
    urls: bulkShortened
  };

  try {
    const response = await axios.post("http://localhost:8080/send-email", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    alert(response.data);
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email. Please try again.");
  }
};

 
 
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
 
  const formData = new FormData();
  formData.append("file", file);
 
  try {
    const response = await axios.post("http://localhost:8080/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
 
    // Response should be an array of { fullURL, shortURL }
    setBulkShortened(response.data);
    setBulkUrls(response.data.map((entry) => entry.fullURL));
    // console.log("Bulk URLs: " + bulkUrls);
  } catch (error) {
    console.error("Failed to upload and shorten URLs:", error);
    alert("Failed to shorten URLs. Please check the file and try again.");
  }
};
 
 
  return (
      <div style={styles.container}>
      <h1 style={styles.title}>Shorteena URL Shortener</h1>
      <p style={styles.subtitle}>
        Paste a long URL or upload a CSV file for bulk shortening.
      </p>
 
      {/* Single URL Input */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter long URL..."
          value={fullURL}
          onChange={(e) => setFullURL(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleShorten} style={styles.button}>
          Shorten
        </button>
      </div>
 
      {shortURL && (
        <div style={styles.result}>
          <p>Short URL:</p>
          <a href={shortURL} target="_blank" rel="noreferrer">
            {shortURL}
          </a>
        </div>
      )}
 
      {/* File Upload */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ marginBottom: "10px" }}>Upload CSV File</h3>
        <h6 style={{ marginBottom: "10px" }}>Add all Full URLs in first column</h6>
        <label htmlFor="file-upload" style={styles.uploadButton}>
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>
 
     
      {bulkShortened.length > 0 && (
  <div className="bulk-results" style={{marginTop: "20px"}}>
    <h3 className="bulk-header">📋 Bulk Shortened URLs</h3>
 
    <div className="table-wrapper">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
          </tr>
        </thead>
        <tbody>
          {bulkShortened.map((item, index) => (
            <tr key={index}>
              <td>
                <a href={item.fullURL} target="_blank" rel="noreferrer" className="url-link">
                  {item.fullURL}
                </a>
              </td>
              <td>
                <a href={item.shortURL} target="_blank" rel="noreferrer" className="url-link short-url">
                  {item.shortURL}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
 
 
    <div className="bulk-actions">
      <button onClick={handleDownload} className="btn download-btn">
        📥 Download CSV
      </button>
      <button onClick={handleEmailSend} className="btn email-btn">
        📧 Send to Email
      </button>
    </div>
  </div>
)}
 
 
 
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
    marginBottom: "10rem",
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
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1,
    minWidth: "250px",
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
  result: {
    marginTop: "20px",
    background: "#f9f9f9",
    padding: "16px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  uploadButton: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#2F4F4F",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "inline-block",
  }  
 
 
};
 
export default UrlShortener;