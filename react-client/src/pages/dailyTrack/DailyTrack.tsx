import React, { useState } from "react";
import AddFoodIntakeForm from "../../components/forms/addFoodIntake/AddFoodIntakeForm";
import { addFoodIntake } from "../../api/user.api";
import Loading from "../../components/lodaing/Loading";

const DailyTrack: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [foodIntakeFormValues, setFoodIntakeFormValues] = useState({
    foodName: "",
    quantity: "",
    date: new Date(),
    mealTime: "BREAKFAST",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Add food intake logic here
      await addFoodIntake(
        // parseInt(foodIntakeFormValues.foodName, 10),
        foodIntakeFormValues.foodName,
        parseInt(foodIntakeFormValues.quantity, 10),
        foodIntakeFormValues.date,
        mealTime,
      );

      setSuccessMessage("Food intake added successfully!");

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
        <h2 className="title">Daily Intake</h2>
      </div>
      <div className="form-body">
        <AddFoodIntakeForm
          onSubmit={onSubmit}
          addFoodIntakeFormValues={foodIntakeFormValues}
          setAddFoodIntakeFormValues={setFoodIntakeFormValues}
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

export default DailyTrack;
