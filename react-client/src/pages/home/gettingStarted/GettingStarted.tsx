import React from "react";
import { useNavigate } from "react-router";
import GettingStartedForm from "../../../components/forms/gettingStarted/GettingStartedForm";


const GettingStarted: React.FC = () => {
  const navigate = useNavigate();
  // State to track the loading, error, and success states

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login")
  };

  return (
    <div>
      <GettingStartedForm onSubmit={onSubmit} />
    </div>
  );
};

export default GettingStarted;
