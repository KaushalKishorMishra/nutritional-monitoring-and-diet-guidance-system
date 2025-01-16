import { BrowserRouter as Router, Route, Routes } from "react-router";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Login from "../pages/authPages/login/Login";
import Register from "../pages/authPages/register/Register";
import Home from "../pages/home/Home";
import GettingStarted from "../pages/gettingStarted/GettingStarted";
import VerifyEmail from "../pages/authPages/verifyEmail/VerifyEmail";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthLayout from "../components/layouts/Auth.layout";
import PublicLayout from "../components/layouts/Publiclayout";
import NotFound from "../components/error/NotFound";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="welcome" element={<OnBoarding />} />
          <Route path="getting-started" element={<GettingStarted />} />
        </Route>
        <Route path="user" element={<AuthLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
