import React, { useState } from "react";
import LoginForm from "../../../components/forms/login/LoginForm";
import { useNavigate } from "react-router";
import { login } from "../../../api/auth.api";
import useUserDataStore from "../../../hooks/store/userData.store";
import { useLoadingStore } from "../../../hooks/store/loading.store";
import Loading from "../../../components/loading/Loading";
import { updateUserDetails } from "../../../api/user.api";
import useGettingStartedStore from "../../../hooks/store/gettingStarted.store";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { loading, setLoading } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { setUserData } = useUserDataStore();
  const { getAllData } = useGettingStartedStore();

  const [loginFormValues, setLoginFormValues] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Perform login
      const response = await login(loginFormValues.email, loginFormValues.password);
      setUserData({ ...response.payload });

      // Check if getting-started data exists and update user details
      const gettingStartedData = getAllData();
      if (gettingStartedData.gender || gettingStartedData.weight || gettingStartedData.height || gettingStartedData.age || gettingStartedData.activityLevel) {
        await updateUserDetails(gettingStartedData).then(() => {
          toast.success("User details updated successfully!");
          localStorage.removeItem("getting-started-storage");
        })
      }

      setSuccessMessage("Logged in successfully!");
      navigate("/user/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form relative">
      <div className="form-header">
        <h2 className="title">Login</h2>
      </div>
      <div className="form-body">
        <LoginForm
          loginFormValues={loginFormValues}
          setLoginFromValues={setLoginFormValues}
          onSubmit={onSubmit}
        />
        {successMessage && (
          <p className="text-center text-green-600">{successMessage}</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Login;