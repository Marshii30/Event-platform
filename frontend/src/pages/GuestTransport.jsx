import React from "react";
import "./GuestTransport.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function GuestTransport() {
  return (
    <div className="service-page">
      <h1 className="service-title">Guest Transport</h1>

      <div className="image-grid">
        <div className="image-box">
          <img src="/images/guest1.jpg" alt="Luxury guest transport 1" />
        </div>
        <div className="image-box">
          <img src="/images/guest2.jpg" alt="Luxury guest transport 2" />
        </div>
        <div className="image-box">
          <img src="/images/guest3.jpg" alt="Luxury guest transport 3" />
        </div>
        <div className="image-box">
          <img src="/images/guest4.jpg" alt="Luxury guest transport 4" />
        </div>
      </div>

      <footer className="service-footer">
        <h2>Planzee Group</h2>
        <p>Vidhya Nagar 4th cross, Near Hanuman Temple, Ballari 583101.</p>
        <div className="social-icons">
          <a
            href="https://instagram.com/marshii_._"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/MaharshiYashuu"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com/in/Maharshi"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright">
          © 2025 [Planzee]. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
