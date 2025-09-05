import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessCancel.css";

export default function CancelPage() {
  const navigate = useNavigate();
  return (
    <div className="result-page cancel">
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again.</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
