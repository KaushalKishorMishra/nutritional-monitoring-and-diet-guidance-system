import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import useUserDataStore from "../../hooks/store/userData.store";
import { isValidToken } from "../../utils/tokenAuth.utils";

const isAuthenticated = () => {
  // Replace this with actual authentication logic
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;
  if (!token) return false;
  const isValid = isValidToken();
  if (!isValid) {
    localStorage.removeItem("user-data");
    return false;
  }
  
  return Boolean(token);
};

const AuthLayout: React.FC = () => {
  const { resetUserDataFromLocalStorage } = useUserDataStore();
  useEffect(() => {
    resetUserDataFromLocalStorage();
  }, [resetUserDataFromLocalStorage]);
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
