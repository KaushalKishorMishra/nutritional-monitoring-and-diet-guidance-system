import React from "react";
import useGettingStartedStore from "../../hooks/store/gettingStarted.store";
import GettingStartedForm from "../../components/forms/gettingStarted/GettingStartedForm";

const GettingStarted: React.FC = () => {
  const { getAllData, clearAllData } = useGettingStartedStore();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = getAllData();
    console.log(data);
    clearAllData();
  };

  return (
    <div>
      <GettingStartedForm onSubmit={onSubmit} />
    </div>
  );
};

export default GettingStarted;
