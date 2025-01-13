import React from "react";
import { Outlet, Navigate } from "react-router";

const isAuthenticated = () => {
  // Replace this with actual authentication logic
  return Boolean(localStorage.getItem("authToken"));
};

const AuthLayout: React.FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
