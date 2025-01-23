import React from "react";

// Define the props interface
interface NutritionFactsProps {
  servingsPerContainer: string;
  servingSize: string;
  calories: string;
  totalFat: string;
  saturatedFat: string;
  cholesterol: string;
  totalCarbohydrate: string;
  potassium: string;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({
  servingsPerContainer,
  servingSize,
  calories,
  totalFat,
  saturatedFat,
  cholesterol,
  totalCarbohydrate,
  potassium,
}) => {
  return (
    <div className="w-64 border border-black p-4 font-sans">
      <h2 className="mb-2 text-2xl font-bold">Nutrition Facts</h2>
      <div className="mb-2 text-sm">
        <span>About {servingsPerContainer} servings per container</span>
      </div>
      <div className="mb-2 text-sm">
        <strong>Serving size</strong> {servingSize}
      </div>
      <div className="mb-2 text-sm">
        <strong>Amount per serving</strong>
      </div>
      <div className="mb-2 text-sm">
        <strong>Calories</strong> {calories}
      </div>
      <div className="mb-2 text-sm">
        <div className="flex justify-between">
          <span>Total Fat</span>
          <span>{totalFat}g</span>
        </div>
        <div className="flex justify-between pl-4">
          <span>Saturated Fat</span>
          <span>{saturatedFat}g</span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="flex justify-between">
          <span>Cholesterol</span>
          <span>{cholesterol}mg</span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="flex justify-between">
          <span>Total Carbohydrate</span>
          <span>{totalCarbohydrate}g</span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="flex justify-between">
          <span>Potassium</span>
          <span>{potassium}mg</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionFacts;
