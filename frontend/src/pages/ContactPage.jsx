import React, { useState } from "react";
import "./ContactPage.css";

// backend base URL (set REACT_APP_API_URL in Vercel; fallback to your Render URL)
const API_BASE = process.env.REACT_APP_API_URL || "https://event-platform-13.onrender.com";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // minimal validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.phone.trim()) {
      alert("Please fill required fields.");
      return;
    }
    if (!formData.consent1 || !formData.consent2) {
      alert("Please agree to both terms before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
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
        const err = await res.json().catch(() => null);
        console.error("Contact form server error:", err);
        alert("There was a problem submitting your message. Check server logs.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error connecting to server. Check your backend URL and CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
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
          From time to time, Planzee Events would like to contact you about our products and services. Please check the boxes below if you are happy to stay in touch:
        </p>
        <label className="checkbox-label">
          <input type="checkbox" name="consent1" checked={formData.consent1} onChange={handleChange} />
          I agree to receive other communications from Planzee Events.
        </label>

        <p className="agreement-text">
          Planzee Events needs to store your data in order to contact you in regards your enquiry above.
        </p>
        <label className="checkbox-label">
          <input type="checkbox" name="consent2" checked={formData.consent2} onChange={handleChange} />
          I agree to allow Planzee Events to store and process my personal data.*
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
