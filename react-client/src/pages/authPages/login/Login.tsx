import React, { useState } from "react";
import LoginForm from "../../../components/forms/login/LoginForm";
import { useNavigate } from "react-router";
import { login } from "../../../api/auth.api";
import Loading from "../../../components/loading/Loading";
import useUserDataStore from "../../../hooks/store/userData.store";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { setUserData } = useUserDataStore();

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
      await login(loginFormValues.email, loginFormValues.password)
        .then((response) => {
          setUserData({ ...response.payload });
          setSuccessMessage("Logged in successful!");
          navigate("/user/dashboard");
        })
        .catch((err) => {
          setError(
            err?.response?.data?.message ||
              "An error occurred. Please try again.",
          );
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err?.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
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
      {loading && <Loading />}
    </div>
  );
};

export default Login;
