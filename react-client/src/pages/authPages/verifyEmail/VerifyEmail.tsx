import React, { useState } from "react";
import VerifyEmailForm from "../../../components/forms/verifyEmail/VerifyEmailForm";

const VerifyEmail: React.FC = () => {
  const [verifyEmailFormValues, setVerifyEmailFormValues] = useState({
    email: "",
    emailVerificationToken: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(verifyEmailFormValues);
  };

  return (
    <div className="form">
      <div className="form-header">
        <h2 className="title">Verify Email</h2>
      </div>
      <div className="form-body">
        <VerifyEmailForm
          verifyEmailFormValues={verifyEmailFormValues}
          setVerifyEmailFormValues={setVerifyEmailFormValues}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
