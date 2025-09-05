import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExclusiveParty.css";

export default function ExclusiveParty() {
  const navigate = useNavigate();

  const tickets = [
    { type: "Super Early Bird Ticket", price: 200 },
    { type: "Early Bird Ticket", price: 100 },
    { type: "Regular Ticket", price: 70 }
  ];

  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (ticket, value) => {
    setQuantities({ ...quantities, [ticket]: value });
  };

  const handleBuyNow = (ticket) => {
    navigate("/payment", { state: { price: ticket.price, ticketType: ticket.type } });
  };

  return (
    <div className="party-container">
      <h1 className="party-title">EXCLUSIVE PARTY</h1>

      <div className="party-image">
        <img
          src="/exclusiveparty.jpg"
          alt="Exclusive Party"
        />
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket Type</th>
            <th>Price</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.type}</td>
              <td>USD {ticket.price}.00</td>
              <td>
                <select
                  value={quantities[ticket.type] || 0}
                  onChange={(e) => handleQtyChange(ticket.type, e.target.value)}
                >
                  {[...Array(11).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="book-btn"
                  onClick={() => handleBuyNow(ticket)}
                >
                  Buy Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
