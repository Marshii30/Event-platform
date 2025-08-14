import React from 'react';
import './PreEventPlanning.css';
import { Link } from 'react-router-dom';

export default function PreEventPlanning() {
  return (
    <div className="service-page">
      <h1 className="service-title">Pre-Event Planning</h1>

      <div className="image-row">
        <div className="image-box">
          <img src="/images/preplanning/pre1.jpg" alt="Pre-event planning option 1" />
        </div>
        <div className="image-box">
          <img src="/images/preplanning/pre2.jpg" alt="Pre-event planning option 2" />
        </div>
      </div>

      <Link to="/contact" className="book-button">Book Consultant</Link>
      
      <p className="service-text">
        Pre-event planning in event ticketing involves all the preparation required before the event day
        to ensure a smooth and successful experience. This includes budgeting, scheduling, vendor selection,
        logistics coordination, staffing, marketing campaigns, and ticketing strategies. Careful planning
        ensures that every aspect of the event aligns with its objectives and meets audience expectations.
        It also allows teams to anticipate challenges, secure necessary permits, and establish contingency
        plans. In ticketed events, strong pre-event planning directly impacts attendance, revenue, and
        overall attendee satisfaction. Well-prepared events are more likely to run efficiently and leave
        a positive impression on participants.
      </p>
    </div>
  );
}
