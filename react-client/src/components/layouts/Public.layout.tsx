import React from "react";
import { Outlet } from "react-router";

const PublicLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
