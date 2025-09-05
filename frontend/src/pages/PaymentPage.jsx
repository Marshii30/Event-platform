import React, { useState } from "react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Put your publishable key here or keep as-is if already correct
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_51S2prLGDiqgQkK1fWiwAXUbYcBfbF35kFa0kC2lovj1YajB9HutFuUnkqh6VevF8kWAEwm4nuLD2mgcTgLi0dJzm00XejESL0P";

// backend base URL (set REACT_APP_API_URL in Vercel; fallback to your Render URL)
const API_BASE = process.env.REACT_APP_API_URL || "https://event-platform-13.onrender.com";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const location = useLocation();
  const { price = 0, ticketType = "Event Ticket" } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your name and email before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load.");

      const body = {
        amount: price,
        name,
        email,
        ticket_type: ticketType
      };

      const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Server error creating checkout session:", err);
        alert("Failed to start checkout. Check server logs.");
        setLoading(false);
        return;
      }

      const session = await res.json();

      // server should return { id: '<stripe_session_id>' }
      if (!session || !session.id) {
        console.error("Invalid session response:", session);
        alert("Failed to start checkout (invalid response).");
        setLoading(false);
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error);
        alert(result.error.message || "Stripe redirect failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to start checkout — check console/network and your backend URL.");
    } finally {
      setLoading(false);
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

      <button
        className="proceed-btn"
        onClick={handleProceed}
        disabled={loading}
      >
        {loading ? "Starting checkout…" : "Pay Now"}
      </button>
    </div>
  );
}
