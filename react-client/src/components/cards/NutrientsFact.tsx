import React from "react";
import { TDetailedFoodForShowPage } from "../../types/food";

interface PNutritionFacts {
  data: TDetailedFoodForShowPage | null;
}

// Helper function to render a nutrition fact row
const renderNutritionFact = (
  label: string,
  value: number | string,
  unit: string = "",
) => {
  if (typeof value === "number") {
    value = value.toString();
  }
  const parsedValue = parseFloat(parseFloat(value).toFixed(2));
  if (!parsedValue || parsedValue == 0) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-bold">
        {parsedValue ?? "0"}
        {unit && ` ${unit}`}
      </span>
    </div>
  );
};

const NutritionFacts: React.FC<PNutritionFacts> = ({ data }) => {
  if (!data) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  return (
    <div className="nutrition-facts w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 flex text-2xl font-bold">Nutrition Facts</h2>
      <div className="mb-4">
        <p className="text-sm text-base-300">
          Serving size: {data.serving_size}g
        </p>
      </div>
      <div className="border-b border-t border-gray-300 py-2">
        <p className="font-bold">Amount per serving</p>
      </div>
      <div className="mt-4 space-y-2">
        {renderNutritionFact("Calories", data.calories, "kcal")}
        {renderNutritionFact("Total Fat", data.total_fat, "g")}
        {renderNutritionFact("Saturated Fat", data.saturated_fat, "g")}
        {renderNutritionFact("Cholesterol", data.cholesterol, "mg")}
        {renderNutritionFact("Sodium", data.sodium, "mg")}
        {renderNutritionFact("Total Carbohydrate", data.carbohydrate, "g")}
        {renderNutritionFact("Protein", data.protein, "g")}
        {renderNutritionFact("Potassium", data.potassium, "mg")}
        {renderNutritionFact("Choline", data.choline, "mg")}
        {renderNutritionFact("Vitamin A", data.vitamin_a, "IU")}
        {renderNutritionFact("Vitamin B12", data.vitamin_b12, "mcg")}
        {renderNutritionFact("Vitamin B6", data.vitamin_b6, "mg")}
        {renderNutritionFact("Vitamin C", data.vitamin_c, "mg")}
        {renderNutritionFact("Vitamin D", data.vitamin_d, "IU")}
        {renderNutritionFact("Vitamin E", data.vitamin_e, "mg")}
        {renderNutritionFact("Vitamin K", data.vitamin_k, "mcg")}
        {renderNutritionFact("Calcium", data.calcium, "mg")}
        {renderNutritionFact("Copper", data.copper, "mg")}
        {renderNutritionFact("Iron", data.iron, "mg")}
        {renderNutritionFact("Magnesium", data.magnesium, "mg")}
        {renderNutritionFact("Manganese", data.manganese, "mg")}
        {renderNutritionFact("Phosphorous", data.phosphorous, "mg")}
        {renderNutritionFact("Zinc", data.zinc, "mg")}
        {renderNutritionFact("Glutamic Acid", data.glutamic_acid, "g")}
        {renderNutritionFact("Glycine", data.glycine, "g")}
        {renderNutritionFact("Fiber", data.fiber, "g")}
        {renderNutritionFact("Sugars", data.sugars, "g")}
        {renderNutritionFact("Fructose", data.fructose, "g")}
        {renderNutritionFact("Galactose", data.galactose, "g")}
        {renderNutritionFact("Glucose", data.glucose, "g")}
        {renderNutritionFact("Lactose", data.lactose, "g")}
        {renderNutritionFact("Maltose", data.maltose, "g")}
        {renderNutritionFact("Sucrose", data.sucrose, "g")}
        {renderNutritionFact("Fat", data.fat, "g")}
        {renderNutritionFact(
          "Saturated Fatty Acids",
          data.saturated_fatty_acids,
          "g",
        )}
        {renderNutritionFact(
          "Trans Fatty Acids",
          data.fatty_acids_total_trans as unknown as number,
          "g",
        )}
        {renderNutritionFact("Alcohol", data.alcohol, "g")}
        {renderNutritionFact("Ash", data.ash, "g")}
        {renderNutritionFact("Caffeine", data.caffeine, "mg")}
        {renderNutritionFact("Water", data.water, "g")}
      </div>
    </div>
  );
};

export default NutritionFacts;
