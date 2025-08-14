import React from 'react';
import './SetBuilding.css';
import { Link } from 'react-router-dom';

export default function SetBuilding() {
  return (
    <div className="service-page">
      <h1 className="service-title">Set Building</h1>

      <div className="setbuilding-image-row">
        <div className="setbuilding-image-box">
          <img src="/images/setbuilding/set1.jpg" alt="Set Building option 1" />
        </div>
        <div className="setbuilding-image-box">
          <img src="/images/setbuilding/set2.jpg" alt="Set Building option 2" />
        </div>
      </div>

      <Link to="/contact" className="book-button">Book Consultant</Link>

      <p className="service-text">
        Set building in event ticketing refers to the design and construction of physical structures,
        stages, or themed environments for an event. It involves translating creative concepts into
        functional setups that enhance the audience’s visual and emotional experience. Key aspects
        include selecting materials, ensuring safety, meeting technical requirements for lighting
        and sound, and aligning with the event’s branding. In ticketed events, an attractive set can
        elevate the perceived value, justify premium pricing, and create memorable moments that
        encourage repeat attendance. Set building also requires coordination between designers,
        builders, and event managers to stay within budget and timelines.
      </p>
    </div>
  );
}
