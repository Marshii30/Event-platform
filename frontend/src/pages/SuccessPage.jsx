import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessCancel.css";

export default function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="result-page success">
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for booking with <b>Planzee Events</b>.</p>
      <p>Check your email for ticket details 🎟️</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
