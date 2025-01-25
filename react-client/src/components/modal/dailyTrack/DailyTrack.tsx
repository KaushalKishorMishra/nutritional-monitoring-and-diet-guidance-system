import React, { useState } from "react";
import AddFoodIntakeForm from "../../forms/addFoodIntake/AddFoodIntakeForm";
import Loading from "../../loading/Loading";
import { toast } from "react-toastify";
import { getCurrentTime } from "../../../utils/getTime.utils";
import { useModalStore } from "../../../hooks/store/modal.store";

type PDailyTrack = {
  setListFoodData: React.Dispatch<React.SetStateAction<{
    foodName?: string;
    foodId?: string;
    quantity: string;
    date: Date;
    mealTime: string;
  }[]>>,
  loading: boolean,
  error: string | null,
  modalName: string
}

const DailyTrack: React.FC<PDailyTrack> = ({
  setListFoodData,
  loading,
  modalName
}) => {

  const { closeModal } = useModalStore()

  const [foodIntakeFormValues, setFoodIntakeFormValues] = useState<{
    foodName?: string;
    foodId?: string;
    quantity: string;
    date: Date;
    mealTime: string;
  }>({
    foodName: "",
    foodId: "",
    quantity: "",
    date: new Date(),
    mealTime: getCurrentTime(),
  });


  // Function to handle adding food data to the list (without API call)
  const handleAddFoodData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (foodIntakeFormValues.foodId) {
      // Add the food intake data to the list
      setListFoodData((prev) => [...prev, foodIntakeFormValues]);

      // Reset the form values
      setFoodIntakeFormValues({
        foodName: "",
        foodId: "",
        quantity: "",
        date: new Date(),
        mealTime: getCurrentTime(),
      });
      closeModal("Add Food")
      toast.success("Food intake added to the list successfully!");
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