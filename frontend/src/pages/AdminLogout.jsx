import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  }, [navigate]);

  return null;
}
