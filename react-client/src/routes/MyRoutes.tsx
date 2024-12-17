import { BrowserRouter as Router, Route, Routes } from "react-router";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Login from "../pages/login/Login";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<OnBoarding />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
