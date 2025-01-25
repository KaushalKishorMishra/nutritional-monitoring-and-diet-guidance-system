import React from "react";
import NutritionFacts from "../../../../components/cards/NutrientsFact";

const ShowFood: React.FC = () => {
  return (
    <div className="p-8">
      <NutritionFacts
        servingsPerContainer="8"
        servingSize="About 15 chips (28g)"
        calories="150"
        totalFat="9"
        saturatedFat="1.5"
        cholesterol="0"
        totalCarbohydrate="16"
        potassium="330"
      />
    </div>
  );
};

export default ShowFood;
