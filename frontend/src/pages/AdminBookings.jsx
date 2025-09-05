import React, { useEffect, useState } from "react";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error("Unexpected API response:", data);
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>⏳ Loading bookings...</h2>;

  return (
    <div className="admin-container">
      <h1>📊 Admin Bookings Dashboard</h1>

      <table className="bookings-table">
        <thead>
          <tr>
            <th colSpan="7" style={{ textAlign: "right", background: "#f9f9f9" }}>
              <a href="http://localhost:5000/api/export-bookings/csv">
                <button className="export-btn">📄 Export CSV</button>
              </a>
              <a href="http://localhost:5000/api/export-bookings/excel" style={{ marginLeft: "10px" }}>
                <button className="export-btn">📊 Export Excel</button>
              </a>
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Ticket Type</th>
            <th>Amount (USD)</th>
            <th>Session ID</th>
            <th>Booked At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.ticket_type}</td>
                <td>{(b.amount / 100).toFixed(2)}</td>
                <td>{b.session_id}</td>
                <td>{b.created_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">⚠️ No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
