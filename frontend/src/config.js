const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const response = await fetch(`${BACKEND}/api/create-checkout-session`, { ... })