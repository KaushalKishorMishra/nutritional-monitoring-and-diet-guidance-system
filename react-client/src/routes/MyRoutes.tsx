import { BrowserRouter as Router, Route, Routes } from "react-router";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Login from "../pages/authPages/login/Login";
import Register from "../pages/authPages/register/Register";
import Home from "../pages/home/Home";
import GettingStarted from "../pages/gettingStarted/GettingStarted";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<OnBoarding />} />
        <Route path="getting-started" element={<GettingStarted />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
