import React from "react";
import "./SoundAndLighting.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const SoundAndLighting = () => {
  return (
    <div className="service-page">
      <h1 className="service-title">Sound and Lighting</h1>

      <div className="image-grid">
        <div className="image-box">
          <img src="/images/sound-lighting/sl1.jpg" alt="Sound setup 1" />
        </div>
        <div className="image-box">
          <img src="/images/sound-lighting/sl2.jpg" alt="Sound setup 2" />
        </div>
        <div className="image-box">
          <img src="/images/sound-lighting/sl3.jpg" alt="Lighting setup 1" />
        </div>
        <div className="image-box">
          <img src="/images/sound-lighting/sl4.jpg" alt="Lighting setup 2" />
        </div>
      </div>

      <footer className="service-footer">
        <h2>Planzee Group</h2>
        <p>Vidhya Nagar 4th cross, Near Hanuman Temple, Ballari 583101.</p>
        <div className="social-icons">
          <a href="https://instagram.com/marshii_._" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com/MaharshiYashuu" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com/in/Maharshi" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright">
          © 2025 Planzee. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SoundAndLighting;
