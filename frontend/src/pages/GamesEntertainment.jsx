import React from "react";
import "./GamesEntertainment.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function GamesEntertainment() {
  return (
    <div className="service-page">
      <h1 className="service-title">Games & Entertainment</h1>

      <div className="image-grid">
        <div className="image-box">
          <img src="/images/games-entertainment1.jpg" alt="Games & Entertainment 1" />
        </div>
        <div className="image-box">
          <img src="/images/games-entertainment2.jpg" alt="Games & Entertainment 2" />
        </div>
        <div className="image-box">
          <img src="/images/games-entertainment3.jpg" alt="Games & Entertainment 3" />
        </div>
        <div className="image-box">
          <img src="/images/games-entertainment4.jpg" alt="Games & Entertainment 4" />
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
