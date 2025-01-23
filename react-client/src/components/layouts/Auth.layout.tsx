import React from "react";
import { Outlet, useNavigate } from "react-router";
import { isAuthenticated } from "../../utils/tokenAuth.utils";


const AuthLayout: React.FC = () => {
  const navigate = useNavigate()

  if (!isAuthenticated()) {
    navigate('/login')
    return
    // return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
