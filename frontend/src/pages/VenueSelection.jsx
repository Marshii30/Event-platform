import React from "react";
import "./VenueSelection.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function VenueSelection() {
  return (
    <div className="service-page">
      <h1 className="service-title">Venue Selection</h1>

      <div className="image-grid">
        <div className="image-box">
          <img src="/images/venue-selection1.jpg" alt="Venue option 1" />
        </div>
        <div className="image-box">
          <img src="/images/venue-selection2.jpg" alt="Venue option 2" />
        </div>
        <div className="image-box">
          <img src="/images/venue-selection3.jpg" alt="Venue option 3" />
        </div>
        <div className="image-box">
          <img src="/images/venue-selection4.jpg" alt="Venue option 4" />
        </div>
      </div>

      <footer className="service-footer">
        <h2>Planzee Group</h2>
        <p>Vidhya Nagar 4th cross, Near Hanuman Temple, Ballari 583101.</p>
        <div className="social-icons">
          <a href="https://instagram.com/marshii_._" target="_blank" rel="noreferrer"><FaInstagram/></a>
          <a href="https://facebook.com/MaharshiYashuu" target="_blank" rel="noreferrer"><FaFacebook/></a>
          <a href="https://linkedin.com/in/Maharshi" target="_blank" rel="noreferrer"><FaLinkedin/></a>
        </div>
        <p className="copyright">© 2025 [Planzee]. All rights reserved.</p>
      </footer>
    </div>
  );
}
