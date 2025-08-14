import React from 'react';
import './VenueFinding.css';
import { Link } from 'react-router-dom';

export default function VenueFinding() {
  return (
    <div className="service-page">
      <h1 className="service-title">Venue Finding</h1>

      <div className="venuefinding-image-row">
        <div className="venuefinding-image-box">
          <img src="/images/venuefinding/venue1.jpg" alt="Venue Finding option 1" />
        </div>
        <div className="venuefinding-image-box">
          <img src="/images/venuefinding/venue2.jpg" alt="Venue Finding option 2" />
        </div>
      </div>

      <Link to="/contact" className="book-button">Book Consultant</Link>

      <p className="service-text">
        Venue finding involves researching, evaluating, and securing the perfect location for an
        event. This process considers factors such as capacity, accessibility, amenities, and
        overall suitability for the event’s objectives. For ticketed events, selecting the right
        venue can greatly impact attendance, audience satisfaction, and profitability. Venue finding
        may also include negotiating rental agreements, coordinating site visits, and ensuring
        compliance with local regulations.
      </p>
    </div>
  );
}
