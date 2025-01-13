import RootLayout from "../components/layouts/Root.layout";
import { Outlet } from "react-router";

const AuthenticatedRoutes = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default AuthenticatedRoutes;
