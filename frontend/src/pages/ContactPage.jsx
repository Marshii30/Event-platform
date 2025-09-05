import React, { useState } from "react";
import "./ContactPage.css";
import API_BASE from "../config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    consent1: false,
    consent2: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent1 || !formData.consent2) {
      alert("Please agree to both terms before submitting.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been submitted successfully.");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          consent1: false,
          consent2: false,
        });
      } else {
        const text = await response.text();
        alert("There was a problem submitting your message: " + text);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error connecting to server: " + error.message);
    }
  };

  return (
    <div className="contact-container">
      {/* Left Column */}
      <div className="contact-left">
        <h2>Planzee Group</h2>
        <p>Vidhya Nagar 4th cross, Near Hanuman Temple, Ballari 583101.</p>
        <div className="social-links">
          <a href="https://instagram.com/marshii_._" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com/MaharshiYashu" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://linkedin.com/in/Maharshi" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Right Column (Form) */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name*</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Mail id*</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Company Name*</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} required />

        <label>Phone No.*</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Message</label>
        <textarea name="message" rows="4" value={formData.message} onChange={handleChange} />

        <p className="agreement-text">
          From time to time, Planzee Events would like to contact you about our products and
          services, as well as other content that may be of interest to you. Please check the
          boxes below if you are happy to stay in touch:
        </p>
        <label className="checkbox-label">
          <input type="checkbox" name="consent1" checked={formData.consent1} onChange={handleChange} />
          I agree to receive other communications from Planzee Events.
        </label>

        <p className="agreement-text">
          Planzee Events needs to store your data in order to contact you in regards your enquiry
          above. If you consent to us storing your personal data for this purpose, please tick the
          checkbox below.
        </p>
        <label className="checkbox-label">
          <input type="checkbox" name="consent2" checked={formData.consent2} onChange={handleChange} />
          I agree to allow Planzee Events to store and process my personal data.*
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
