import React, { useState } from "react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProceed = async () => {
    if (!name || !email) {
      alert("Please fill in your name and email before proceeding.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })  // only name and email sent
      });

      if (response.ok) {
        alert("The Ticket Will Be Sent To your Mail ID");
        setName("");
        setEmail("");
      } else {
        const errData = await response.json();
        alert("Something went wrong: " + (errData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Page</h1>
      <p className="payment-amount">Amount to Pay: USD {amount}</p>

      <div className="qr-section">
        <img src="/payment-qr.png" alt="Payment QR" />
        <p>Scan this QR code to make the payment</p>
      </div>

      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="proceed-btn" onClick={handleProceed}>
        Proceed
      </button>
    </div>
  );
}
