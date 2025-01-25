import React from "react";
import SearchField from "../SearchField";
import InputField from "../InputField";
import CustomDatePicker from "../DatePicker";
import { getFoodByNameFromDataBase } from "../../../api/food.api";
import CustomTimePicker from "../TimePicker";
import { useModalStore } from "../../../hooks/store/modal.store";

interface PAddFoodIntakeForm {
  addFoodIntakeFormValues: {
    foodName?: string; // Make foodName optional
    foodId?: string; // Make foodId optional
    quantity: string;
    date: Date;
    mealTime: string; // Make mealTime optional
  };
  setAddFoodIntakeFormValues: React.Dispatch<
    React.SetStateAction<{
      foodName?: string; // Make foodName optional
      foodId?: string; // Make foodId optional
      quantity: string;
      date: Date;
      mealTime: string; // Make mealTime optional
    }>
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (e: any) => void;
  modalName: string
}

const AddFoodIntakeForm: React.FC<PAddFoodIntakeForm> = ({
  onSubmit,
  setAddFoodIntakeFormValues,
  addFoodIntakeFormValues,
  modalName
}) => {
  const inputFields = [
    {
      label: "Food:",
      type: "text",
      id: "food",
      name: "foodName",
      value: addFoodIntakeFormValues.foodName || "", // Handle undefined case
    },
    {
      label: "Quantity:",
      type: "number",
      id: "quantity",
      name: "quantity",
      value: addFoodIntakeFormValues.quantity,
    },
  ];

  const { closeModal } = useModalStore()

  const handleChange =
    (field: keyof typeof addFoodIntakeFormValues) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddFoodIntakeFormValues((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleFoodSelect = (foodId: string, foodName: string) => {
    setAddFoodIntakeFormValues((prev) => ({
      ...prev,
      foodId, // Save the selected food ID
      foodName, // Update the food name in the form
    }));
  };

  const handleDateChange = (newDate: Date) => {
    setAddFoodIntakeFormValues((prev) => ({
      ...prev,
      date: newDate, // Update the date in the form
    }));
  };

  const handleTimeChange = (time: string) => {
    setAddFoodIntakeFormValues((prev) => ({
      ...prev,
      mealTime: time, // Update the mealTime in the form
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {/* SearchField for Food Name */}
      <SearchField
        label="Food:"
        type="text"
        id="food"
        name="foodName"
        value={addFoodIntakeFormValues.foodName || ""} // Handle undefined case
        onChange={handleChange("foodName")}
        fetchData={getFoodByNameFromDataBase}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderResults={(result: any) => result.name} // Assuming `name` is the food name
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getId={(result: any) => result.id} // Assuming `id` is the unique food ID
        onSelect={handleFoodSelect} // Pass the handler with two arguments
      />

      {/* Quantity Field */}
      {inputFields.slice(1).map((field) => (
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
      ))}

      <div className="flex flex-row justify-between gap-2">
        {/* CustomDatePicker for Date */}
        <div className="input-container">
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <CustomDatePicker
            date={addFoodIntakeFormValues.date}
            setDate={handleDateChange} // Pass the handleDateChange function
          />
        </div>

        {/* CustomTimePicker for Time */}
        <div className="input-container">
          <label className="block text-sm font-medium text-gray-700">Time:</label>
          <div className="w-full">
            <CustomTimePicker
              value={addFoodIntakeFormValues.mealTime || "10:00"} // Default to "10:00" if mealTime is undefined
              onChange={handleTimeChange} // Pass the handleTimeChange function
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Add Food To List
        </button>
        <button onClick={() => closeModal(modalName)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddFoodIntakeForm;