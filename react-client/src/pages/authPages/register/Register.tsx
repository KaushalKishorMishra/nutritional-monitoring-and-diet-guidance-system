import React from "react";
import RegisterForm from "../../../components/forms/register/RegisterForm";

const Register: React.FC = () => {
  const [registerFromValues, setRegisterFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerFromValues);
  };

  return (
    <div className="form">
      <div className="form-header">
        <h1 className="title">Register</h1>
        <p className="subtitle">
          Welcome to the registration page. Please fill in the form below to
          create an account.
        </p>
      </div>
      <div className="form-body">
        <RegisterForm
          registerFormValues={registerFromValues}
          setRegisterFormValues={setRegisterFormValues}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
