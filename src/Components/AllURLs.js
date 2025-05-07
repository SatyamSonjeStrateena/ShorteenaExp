import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AllURLs.css";
 
const UrlList = () => {
  const [urlData, setUrlData] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = sessionStorage.getItem("token");
 
  useEffect(() => {
    axios.get("http://localhost:8080/all-urls", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUrlData(response.data);
    })
    .catch(error => {
      console.error("Failed to fetch URLs:", error);
      alert("Error loading URLs. Please try again later.");
    });
  }, []);
 
  const filteredData = urlData.filter(item => {
    if (filter === "clicked") return item.redirectCount > 0;
    if (filter === "notClicked") return item.redirectCount === 0;
    return true;
  });
 
  return (
    <div className="url-list-container">
      <h1 className="url-list-title">All Shortened URLs</h1>
      <p className="url-list-subtitle">
        Here is a list of all your shortened URLs.
      </p>
 
      <div className="filter-button-container">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({urlData.length})
        </button>
        <button
          className={`filter-button ${filter === "clicked" ? "active" : ""}`}
          onClick={() => setFilter("clicked")}
        >
          Clicked ({urlData.filter(item => item.redirectCount > 0).length})
        </button>
        <button
          className={`filter-button ${filter === "notClicked" ? "active" : ""}`}
          onClick={() => setFilter("notClicked")}
        >
          Not Clicked ({urlData.filter(item => item.redirectCount === 0).length})
        </button>
      </div>
 
      {filteredData.length === 0 ? (
        <p className="no-urls-message">No URLs found matching the current filter.</p>
      ) : (
        <table className="url-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Original URL</th>
              <th className="table-header">Short URL</th>
              <th className="table-header">Redirect Count</th>
              <th className="table-header">Created At</th>
              <th className="table-header">Last Clicked At</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`data-row ${item.redirectCount === 0 ? "redirect-zero" : ""}`}
              >
                <td className="table-data">{item.name}</td>
                <td className="table-data">
                  <a href={item.fullURL} target="_blank" rel="noreferrer" className="table-link">
                    {item.fullURL}
                  </a>
                </td>
                <td className="table-data">
                  <a href={item.shortURL} target="_blank" rel="noreferrer" className="table-link">
                    {item.shortURL}
                  </a>
                </td>
                <td className="table-data redirect-count">
                  {item.redirectCount}
                </td>
                <td className="table-data">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="table-data">
                  {item.lastClickedAt
                    ? new Date(item.lastClickedAt).toLocaleDateString()
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 
export default UrlList;