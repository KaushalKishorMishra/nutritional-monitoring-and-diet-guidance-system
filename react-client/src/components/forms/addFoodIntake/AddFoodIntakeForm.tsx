import React from "react";
import SearchField from "../SearchField";
import InputField from "../InputField";
import { searchFoodByName } from "../../../api/usfdc.api";

interface PAddFoodIntakeForm {
  addFoodIntakeFormValues: {
    foodName: string;
    foodId?: string; // Add field for the selected food ID
    quantity: string;
    date: Date;
  };
  setAddFoodIntakeFormValues: React.Dispatch<
    React.SetStateAction<{
      foodName: string;
      foodId?: string;
      quantity: string;
      date: Date;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddFoodIntakeForm: React.FC<PAddFoodIntakeForm> = ({
  onSubmit,
  setAddFoodIntakeFormValues,
  addFoodIntakeFormValues,
}) => {
  const inputFields = [
    {
      label: "Food:",
      type: "text",
      id: "food",
      name: "foodName",
      value: addFoodIntakeFormValues.foodName,
      api: searchFoodByName,
    },
    {
      label: "Quantity:",
      type: "number",
      id: "quantity",
      name: "quantity",
      value: addFoodIntakeFormValues.quantity,
    },
    {
      label: "Date:",
      type: "date",
      id: "date",
      name: "date",
      value: addFoodIntakeFormValues.date,
    },
  ];

  const handleChange =
    (field: keyof typeof addFoodIntakeFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddFoodIntakeFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleFoodSelect = (foodId: string) => {
    setAddFoodIntakeFormValues((prev) => ({
      ...prev,
      foodId, // Save the selected food ID
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {inputFields.map((field) =>
        field.type === "date" || field.type === "number" ? (
          <InputField
            key={field.id}
            label={field.label}
            type={field.type}
            id={field.id}
            name={field.name}
            value={String(field.value)}
            onChange={handleChange(
              field.name as keyof typeof addFoodIntakeFormValues,
            )}
            required
          />
        ) : (
          <SearchField
            key={field.id}
            label={field.label}
            type={field.type}
            id={field.id}
            name={field.name}
            value={String(field.value)}
            onChange={handleChange(
              field.name as keyof typeof addFoodIntakeFormValues,
            )}
            required
            fetchData={searchFoodByName}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderResults={(result: any) => result.description} // Assuming `description` is the food name
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getId={(result: any) => result.fdcId} // Assuming `fdcId` is the unique food ID
            onSelect={handleFoodSelect}
          />
        ),
      )}

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Add Food
        </button>
      </div>
    </form>
  );
};

export default AddFoodIntakeForm;
