import React from "react";
import "./ThemedDecor.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function ThemedDecor() {
  return (
    <div className="service-page">
      <h1 className="service-title">Themed Decor</h1>

      <div className="image-grid">
        <div className="image-box">
          <img src="/images/themed-decor1.jpg" alt="Themed Decor 1" />
        </div>
        <div className="image-box">
          <img src="/images/themed-decor2.jpg" alt="Themed Decor 2" />
        </div>
        <div className="image-box">
          <img src="/images/themed-decor3.jpg" alt="Themed Decor 3" />
        </div>
        <div className="image-box">
          <img src="/images/themed-decor4.jpg" alt="Themed Decor 4" />
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
