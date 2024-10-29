// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("adminToken");

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/adminlogin" state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
