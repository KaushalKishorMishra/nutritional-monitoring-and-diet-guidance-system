import React, { useState } from "react";
import LoginForm from "../../components/layouts/forms/login/LoginForm";

const Login: React.FC = () => {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
