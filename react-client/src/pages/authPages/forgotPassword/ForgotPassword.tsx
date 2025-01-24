import React, { useState } from "react";
import ForgotPasswordForm from "../../../components/forms/forgotPassword/ForgotPasswordForm";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../api/auth.api";
import { useNavigate } from "react-router";

const ForgotPassword: React.FC = () => {
  const [forgotPasswordFormValues, setForgotPasswordFormValues] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("verificationEmail", forgotPasswordFormValues.email);
      await forgotPassword(forgotPasswordFormValues.email).then(() => {
        toast.success("Email sent successfully. Please check your inbox.");
        navigate("/reset-password")
      })
    } catch (err) {
      toast.error(`An error occurred. Please try again.: ${err}`);
    }
  };

  return (
    <div className="form">
      <div className="form-header">
        <h2 className="title">Forgot Password</h2>
      </div>
      <div className="form-body">
        <ForgotPasswordForm
          forgotPasswordFormValues={forgotPasswordFormValues}
          setForgotPasswordFormValues={setForgotPasswordFormValues}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
