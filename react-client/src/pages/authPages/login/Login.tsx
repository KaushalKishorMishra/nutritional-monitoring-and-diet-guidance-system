import React, { useState } from "react";
import LoginForm from "../../../components/forms/login/LoginForm";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/verify-email");
    }, 2000);
    console.log(loginFormValues);
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
      </div>
    </div>
  );
};

export default Login;
