import React from 'react';
import './AVProduction.css';
import { Link } from 'react-router-dom';

export default function AvProduction() {
  return (
    <div className="service-page">
      <h1 className="service-title">AV & Production</h1>

      <div className="image-row">
        <div className="image-box">
          <img src="/images/avproduction/av1.jpg" alt="AV & Production option 1" />
        </div>
        <div className="image-box">
          <img src="/images/avproduction/av2.jpg" alt="AV & Production option 2" />
        </div>
      </div>

      <Link to="/contact" className="book-button">Book Consultant</Link>
      <p className="service-text">
        AV & Production services in event ticketing include audio, video, and lighting solutions 
        that bring an event to life. This involves setting up sound systems, projection screens, 
        LED walls, stage lighting, and special effects to match the event’s theme and scale. 
        Professional AV & Production ensures crystal-clear sound, dynamic visuals, and a seamless 
        experience for attendees. Whether it’s a corporate event, concert, or wedding, high-quality 
        production plays a critical role in leaving a lasting impression.
      </p>
    </div>
  );
}
