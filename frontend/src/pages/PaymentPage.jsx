import React, { useState } from "react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import API_BASE from "../config";

// ✅ Publishable Key
const stripePromise = loadStripe("pk_test_51S2prLGDiqgQkK1fWiwAXUbYcBfbF35kFa0kC2lovj1YajB9HutFuUnkqh6VevF8kWAEwm4nuLD2mgcTgLi0dJzm00XejESL0P");

export default function PaymentPage() {
  const location = useLocation();
  const { price, ticketType } = location.state || { price: 0, ticketType: "Event Ticket" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProceed = async () => {
    if (!name || !email) {
      alert("Please fill in your name and email before proceeding.");
      return;
    }

    const stripe = await stripePromise;

    try {
      const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, name, email, ticketType }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error("Checkout failed: " + text);
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to start checkout: " + error.message);
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Page</h1>
      <p className="payment-amount">
        Amount to Pay: USD {price} ({ticketType})
      </p>

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
        Pay Now
      </button>
    </div>
  );
}
