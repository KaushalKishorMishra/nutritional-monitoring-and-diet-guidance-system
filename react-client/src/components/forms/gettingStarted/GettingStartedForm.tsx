import React from "react";

interface PGettingStartedForm {
  gettingStartedFromValues: {
    
  };
  setGettingStartedFromValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GettingStartedForm: React.FC<PGettingStartedForm> = ({
  onSubmit,
  gettingStartedFromValues,
  setGettingStartedFromValues,
}) => {
  return <form onSubmit={onSubmit}>
    
  </form>;
};

export default GettingStartedForm;
