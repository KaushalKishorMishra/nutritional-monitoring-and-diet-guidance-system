import React, { useState } from "react";
import AddFoodIntakeForm from "../../forms/addFoodIntake/AddFoodIntakeForm";
import Loading from "../../loading/Loading";
import { toast } from "react-toastify";
import { getCurrentTime } from "../../../utils/getTime.utils";
import { useModalStore } from "../../../hooks/store/modal.store";

type PDailyTrack = {
  setListFoodData: React.Dispatch<
    React.SetStateAction<
      {
        foodName?: string;
        foodId?: string;
        quantity: string;
        unit: string; // Add unit field
        date: Date;
        mealTime: string;
      }[]
    >
  >;
  loading: boolean;
  error: string | null;
  modalName: string;
};

const DailyTrack: React.FC<PDailyTrack> = ({
  setListFoodData,
  loading,
  modalName,
}) => {
  const { closeModal } = useModalStore();

  const [foodIntakeFormValues, setFoodIntakeFormValues] = useState<{
    foodName?: string;
    foodId?: string;
    quantity: string;
    unit: string; // Add unit field
    date: Date;
    mealTime: string;
  }>({
    foodName: "",
    foodId: "",
    quantity: "",
    unit: "g", // Default unit
    date: new Date(),
    mealTime: getCurrentTime(),
  });

  // Function to convert any unit to grams
  const convertToGrams = (value: string, unit: string): number => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 0; // Handle invalid input

    const conversionFactors: { [key: string]: number } = {
      // Weight-based units
      mg: 0.001, // 1 milligram = 0.001 grams
      g: 1, // 1 gram = 1 gram
      kg: 1000, // 1 kilogram = 1000 grams
      // Volume-based units (assuming density of water: 1 g/ml)
      ml: 1, // 1 milliliter = 1 gram
      L: 1000, // 1 liter = 1000 grams
      "fl oz": 29.5735, // 1 fluid ounce = 29.5735 grams
      cups: 240, // 1 cup = 240 grams (approximate for water)
      tablespoons: 15, // 1 tablespoon = 15 grams (approximate for water)
      teaspoons: 5, // 1 teaspoon = 5 grams (approximate for water)
    };

    const factor = conversionFactors[unit.toLowerCase()] || 1; // Default to 1 if unit is not found
    return numericValue * factor;
  };

  // Function to handle adding food data to the list (with API call)
  const handleAddFoodData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (foodIntakeFormValues.foodId) {
      // Convert the quantity to grams
      const quantityInGrams = convertToGrams(
        foodIntakeFormValues.quantity,
        foodIntakeFormValues.unit
      );

      try {
        // Add the food intake data to the list (with quantity in grams)
        setListFoodData((prev) => [
          ...prev,
          {
            ...foodIntakeFormValues,
            quantity: quantityInGrams.toString(), // Store quantity in grams as a string
          },
        ]);

        // Reset the form values
        setFoodIntakeFormValues({
          foodName: "",
          foodId: "",
          quantity: "",
          unit: "g", // Reset to default unit
          date: new Date(),
          mealTime: getCurrentTime(),
        });

        closeModal("Add Food");
        toast.success("Food intake added to the list successfully!");
      } catch (error) {
        console.error("Error adding food intake:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Please select a food item.");
    }
  };

  return (
    <div>
      <div className="form-body">
        <AddFoodIntakeForm
          onSubmit={handleAddFoodData} // Use handleAddFoodData for local updates
          addFoodIntakeFormValues={foodIntakeFormValues}
          setAddFoodIntakeFormValues={setFoodIntakeFormValues}
          modalName={modalName}
        />
      </div>

      {/* Display the list of food intake data */}

      {loading && <Loading />}
    </div>
  );
};

export default DailyTrack;