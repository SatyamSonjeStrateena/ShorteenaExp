import React, { useState } from 'react';
// import './Contact.css';
import "../App.css";
 
const ContactPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    contactPerson: '',
    requirements: '',
    phone: '',
    email: '',
    country: '',
    verification: '',
    file: null
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };
 
  const handleReset = () => {
    setFormData({
      companyName: '',
      address: '',
      contactPerson: '',
      requirements: '',
      phone: '',
      email: '',
      country: '',
      verification: '',
      file: null
    });
  };
 
  return (
    <div className="page-container">
      {/* Left Side - Send Enquiry Form */}
      <div className="form-section">
        <h1 className="section-title">Send Enquiry</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name of Company:*</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address / City / Location:*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label>Name of Contact Person:*</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Requirements Details:*</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
              />
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label>Tel. No. / Cell No.:*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label>Choose File</label>
              <div className="file-input">
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <span className="file-label">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>Please, Enter Below Verification Numbers here:</label>
              <div className="verification-input">
                <input
                  type="text"
                  name="verification"
                  value={formData.verification}
                  onChange={handleChange}
                  required
                />
                <span className="verification-code">+12317</span>
              </div>
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label>Select a country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
            </div>
          </div>
        </form>
      </div>
 
      {/* Right Side - Contact Info with Red Background */}
      <div className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-content">
          <div className="office-info">
            <h3>Registered Office : India</h3>
            <p>
              Office No. 406, 66 High Street Square,<br />
              Baner High Street, Pan Card Club Road,<br />
              Baner Gaon, Pune - 411045.<br />
              Maharashtra, India.
            </p>
          </div>
 
          <div className="contact-detail">
            <h3>Mobile :</h3>
            <p>+91 - 9881075123</p>
          </div>
 
          <div className="office-info">
            <h3>US California Office :</h3>
            <p>
              12401 Folsom Blvd,<br />
              Suite 323, Rancho Cordova,<br />
              CA, 95742.
            </p>
          </div>
 
          <div className="contact-detail">
            <h3>Mobile :</h3>
            <p>
              +1 - 484 686 9719<br />
              +1 - 916 618 9071
            </p>
          </div>
 
          <div className="contact-detail">
            <h3>E-mail :</h3>
            <p>enquiry@strateena.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ContactPage;