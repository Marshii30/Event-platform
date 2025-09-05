// src/config.js
const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000"; // fallback for local dev

export default API_BASE;
