import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

// layout imports
import PublicLayout from "../components/layouts/Public.layout";
import AuthLayout from "../components/layouts/Auth.layout";
import { ROUTES } from "../constants/constants";
import Loading from "../components/loading/Loading";
import ForgotPassword from "../pages/authPages/forgotPassword/ForgotPassword";
import PasswordReset from "../pages/authPages/passwordReset/PassowrdReset";
import AddFood from "../pages/user/dashboard/foods/addFood/AddFood";
import ContactUsPage from "../pages/user/profile/contact-us/ContactUsPage";
import AboutUsPage from "../pages/aboutUs/AboutUsPage";
import ShowFood from "../pages/user/dashboard/foods/ShowFood";

// Lazy loading components
const Login = lazy(() => import("../pages/authPages/login/Login"));
const Register = lazy(() => import("../pages/authPages/register/Register"));
const VerifyEmail = lazy(
  () => import("../pages/authPages/verifyEmail/VerifyEmail"),
);
const Home = lazy(() => import("../pages/home/Home"));
const GettingStarted = lazy(
  () => import("../pages/home/gettingStarted/GettingStarted"),
);
const OnBoarding = lazy(() => import("../pages/home/onboarding/OnBoarding"));
const Dashboard = lazy(() => import("../pages/user/dashboard/Dashboard"));
const ProfilePage = lazy(() => import("../pages/user/profile/ProfilePage"));
const ProfileEditPage = lazy(
  () => import("../pages/user/profile/ProfileEditPage"),
);
const NotFound = lazy(() => import("../components/error/NotFound"));

const MyRoutes = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route path={ROUTES.public.home} element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.public.login} element={<Login />} />
            <Route path={ROUTES.public.register} element={<Register />} />
            <Route path={ROUTES.public.verifyEmail} element={<VerifyEmail />} />
            <Route path={ROUTES.public.welcome} element={<OnBoarding />} />
            <Route path={ROUTES.public.forgotPassword} element={<ForgotPassword />} />
            <Route path={ROUTES.public.passwordReset} element={<PasswordReset />} />
            <Route
              path={ROUTES.public.gettingStarted}
              element={<GettingStarted />}
            />
          </Route>
          <Route path="user" element={<AuthLayout />}>
            <Route path={ROUTES.auth.profile} element={<ProfilePage />} />
            <Route path={ROUTES.auth.dashboard} element={<Dashboard />} />
            <Route
              path={ROUTES.auth.profileEdit}
              element={<ProfileEditPage />}
            />
            <Route path={ROUTES.auth.addFoodIntake} element={<AddFood />} />
            <Route path={ROUTES.auth.contactUs} element={<ContactUsPage />} />
            <Route path={ROUTES.auth.aboutUs} element={<AboutUsPage />} />
            <Route path={ROUTES.auth.foodDetails} element={<ShowFood />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default MyRoutes;
