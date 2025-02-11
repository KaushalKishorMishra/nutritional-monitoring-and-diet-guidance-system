import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import DailyTrack from "../../../../../components/modal/dailyTrack/DailyTrack";
import { addFoodIntake } from "../../../../../api/user.api";
import { useModalStore } from "../../../../../hooks/store/modal.store";
import { useLoadingStore } from "../../../../../hooks/store/loading.store";
import { monthDayYearFormat } from "../../../../../utils/dateFormator.utils";
import { getMealTime } from "../../../../../utils/getTime.utils";
import { capitalizeFirstLetter } from "../../../../../utils/randomUtils.utils";
import useRecommendedFoodStore from "../../../../../hooks/store/recommendedFood.store";
import { getRecommendationByHistory } from "../../../../../api/recommendation.api";
import ListItemsCard from "../../../../../components/cards/ListItemsCard";
import { TFoodMinimal } from "../../../../../types/food";

// Define types for better type safety
type FoodIntakeItem = {
  foodName?: string;
  foodId?: string;
  quantity: string; // Quantity in grams (as a string)
  unit: string; // Add unit field
  date: Date;
  mealTime: string;
};
type AssociationRuleWithSupport = {
  antecedent: number[];
  consequent: number[];
  confidence: number;
  support: number;
};
type RecommendationByHistory = {
  matchedRules: AssociationRuleWithSupport[];
  recommendations: number[];
  recommendation: TFoodMinimal[];
};

const AddFood: React.FC = () => {
  const navigate = useNavigate();

  // State for the list of food intake data
  const [listFoodData, setListFoodData] = useState<FoodIntakeItem[]>([]);

  // State for loading and error
  const { openModal } = useModalStore();
  const { loading, setLoading } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);
  const [historyRecommendation, setHistoryRecommendation] =
    useState<RecommendationByHistory | null>(null);

  // Global state for recommended nutrients intake amount
  const {
    calories,
    carbohydrate,
    total_fat,
    cholesterol,
    protein,
    fiber,
    sodium,
    calcium,
  } = useRecommendedFoodStore();

  // Function to handle form submission (API call)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // Check if there is any food intake data
      if (listFoodData.length === 0) {
        toast.error("Please add a food item before saving.");
        return;
      }

      // Send each food intake item to the backend
      for (const foodIntake of listFoodData) {
        if (foodIntake.foodId) {
          // Convert quantity to a number (in grams)
          const quantityInGrams = parseFloat(foodIntake.quantity);

          // Send the data to the backend
          await addFoodIntake(
            foodIntake.foodId,
            quantityInGrams, // Quantity in grams (as a number)
            foodIntake.date,
            foodIntake.mealTime,
          );
        }
      }

      toast.success("Food intake added successfully!");
      navigate("/user/dashboard");
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

  useEffect(() => {
    try {
      getRecommendationByHistory()
        .then((data) => {
          setHistoryRecommendation(data);
        })
        .catch(() => {
          console.log("Failed to load recommended food.");
        });
    } catch (err) {
      //   toast.error("Failed to load recommended food.");
      console.log("Failed to load recommended food.", err);
    }
  }, []);

  // Function to open the DailyTrack modal
  const handleDailyTrack = () => {
    openModal(
      "Add Food",
      <DailyTrack
        setListFoodData={setListFoodData}
        loading={loading}
        error={error}
        modalName="Add Food"
      />,
      "center",
      false,
    );
  };

  // Function to handle deletion of a food intake item
  const handleDelete = (index: number) => {
    setListFoodData((prev) => prev.filter((_, i) => i !== index));
  };

  // Render the list of food intake items
  const renderFoodIntakeList = () => {
    if (listFoodData.length === 0) {
      return <p className="text-gray-500">No food intake data available.</p>;
    }

    return (
      <ul className="space-y-3">
        {listFoodData.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
          >
            <div>
              <p className="font-medium">{item.foodName}</p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity} g
              </p>
              <p className="text-sm text-gray-600">
                Date: {monthDayYearFormat(item.date.toISOString())}
              </p>
              <p className="text-sm text-gray-600">
                Time: {capitalizeFirstLetter(getMealTime(item.mealTime))}
              </p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  // Render the recommended nutrients
  const renderRecommendedNutrients = () => {
    const nutrients = [
      { label: "Calories", value: calories },
      { label: "Carbohydrate", value: carbohydrate },
      { label: "Total Fat", value: total_fat },
      { label: "Cholesterol", value: cholesterol },
      { label: "Protein", value: protein },
      { label: "Fiber", value: fiber },
      { label: "Sodium", value: sodium },
      { label: "Calcium", value: calcium },
    ];

    return (
      <div className="flex items-center justify-center gap-x-5 overflow-scroll font-nunito-sans text-base">
        {nutrients.map(
          (nutrient, index) =>
            nutrient.value && (
              <span
                key={index}
                className="flex flex-col-reverse items-center text-sm text-secondary-content"
              >
                {nutrient.label}{" "}
                <span className="font-semibold">
                  {parseFloat(nutrient.value.toFixed(2))}
                </span>
              </span>
            ),
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between pb-5">
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
          <RxCross2
            className="col-span-1 cursor-pointer"
            onClick={() => navigate("/user/dashboard")}
          />
          <span className="col-span-1 text-center">Meal</span>
          <CgAdd
            className="col-span-1 cursor-pointer place-self-end self-auto hover:text-primary"
            onClick={handleDailyTrack}
          />
        </div>
        <div className="divider m-0"></div>

        {/* Recommended Nutrients */}
        <div className="px-5">
          <span className="font-dm-sans text-xl font-bold">
            Recommended Nutrients
          </span>
          {renderRecommendedNutrients()}
        </div>
        <div className="divider m-0"></div>

        {/* Recommendation From History */}
        <div className="px-5">
          <div className="my-4 font-dm-sans text-xl font-semibold">
            Recommendation By History
          </div>
          <div className="flex flex-col gap-6">
            {historyRecommendation &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              historyRecommendation.recommendation.map((food: TFoodMinimal) => {
                const rule = historyRecommendation.matchedRules.find((rule) => {
                  return rule.consequent.includes(parseInt(food.id));
                });
                const confidence = rule?.confidence
                  ? parseFloat(rule.confidence.toFixed(2))
                  : 0;
                return (
                  <>
                    <ListItemsCard
                      id={food.id}
                      title={food.name}
                      cal={food.calories}
                      type="foodList"
                      desc={`confidence: ${confidence}%`}
                    />
                  </>
                );
              })}
          </div>
        </div>

        {/* Food Intake List */}
        <div className="my-4 px-5">
          <h3 className="font-dm-sans text-xl font-semibold">Food Intake</h3>
          {renderFoodIntakeList()}
        </div>
      </div>

      {/* Save Button */}
      <div className="mx-5 flex w-full justify-center">
        <button
          className="btn btn-primary w-8/12 font-dm-sans text-lg text-white"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddFood;
