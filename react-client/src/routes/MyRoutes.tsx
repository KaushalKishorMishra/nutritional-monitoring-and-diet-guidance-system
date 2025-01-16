import { BrowserRouter as Router, Route, Routes } from "react-router";
// layout imports
import PublicLayout from "../components/layouts/Publiclayout";
import AuthLayout from "../components/layouts/Auth.layout";

// pages imports
// auth pages
import Login from "../pages/authPages/login/Login";
import Register from "../pages/authPages/register/Register";
import VerifyEmail from "../pages/authPages/verifyEmail/VerifyEmail";

// first setup of the app
import Home from "../pages/home/Home";
import GettingStarted from "../pages/gettingStarted/GettingStarted";
import OnBoarding from "../pages/onboarding/OnBoarding";

// authenticated users pages
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfilePage from "../pages/user/ProfilePage";

// error pages
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
          <Route path="profile" element={<ProfilePage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
