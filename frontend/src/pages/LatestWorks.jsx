import React from "react";
import "./LatestWorks.css";

export default function LatestWorks() {
  return (
    <div className="latest-works">
      <h1 className="page-title">Latest Works</h1>

      <div className="work-item">
        <div className="image-box">
          <img src="/images/latest-work1.jpg" alt="BKC Grounds" />
        </div>
        <div className="work-text">
          <h2>Venue: Bandra Kurla Complex Grounds, Mumbai, India</h2>
          <p>
            The Bandra Kurla Complex (BKC) Grounds is a popular open-air venue
            in Mumbai known for hosting large-scale concerts, festivals, and
            corporate events. Its central location offers excellent connectivity
            to the city’s major transport hubs. The spacious grounds can
            accommodate thousands of attendees and support extensive stage
            setups, lighting rigs, and food zones. BKC’s vibrant urban backdrop
            adds to the atmosphere, making it a top choice for high-profile
            ticketed events.
          </p>
        </div>
      </div>

      <div className="work-item">
        <div className="image-box">
          <img src="/images/latest-work2.jpg" alt="Jawaharlal Nehru Stadium" />
        </div>
        <div className="work-text">
          <h2>Venue: Jawaharlal Nehru Stadium, New Delhi, India</h2>
          <p>
            Jawaharlal Nehru Stadium is a premier sports and event venue in the
            capital, hosting concerts, sporting events, and cultural shows.
            With a massive seating capacity and modern facilities, it offers
            excellent visibility, accessibility, and infrastructure for
            large-scale ticketed events.
          </p>
        </div>
      </div>

      <footer className="footer">
        <h3>Planzee Group</h3>
        <p>Vidhya Nagar 4th cross, Near Hanuman Temple, Ballari 583101.</p>
        <div className="social-icons">
          <a
            href="https://instagram.com/marshii_._"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com/MaharshiYashuu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://linkedin.com/in/Maharshi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p className="copyright">
          © 2025 [Planzee]. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
