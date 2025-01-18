import React from "react";
import { RecommendedIntake, TotalIntake } from "../../types/nutrients";
import HorizontalProgress from "./HorizontalProgress";

type PNutrientsVisitation = {
  totalIntake: TotalIntake;
  recommendedIntake: RecommendedIntake;
};

const NutrientsVisitation: React.FC<PNutrientsVisitation> = ({
  totalIntake,
  recommendedIntake,
}) => {
  return (
    <div className="rounded-lg bg-neutral/30 p-5">
      <div className="flex w-full items-center gap-4">
        <HorizontalProgress
          total={totalIntake.protein}
          recommended={recommendedIntake.protein}
          color="progress-error"
          name="Protein"
          />
        <HorizontalProgress
          total={totalIntake.total_fat}
          recommended={recommendedIntake.total_fat}
          color="progress-warning"
          name="Fat"
          />
        <HorizontalProgress
          total={totalIntake.carbohydrate}
          recommended={recommendedIntake.carbohydrate}
          color="progress-accent"
          name="Carbs"
          />
      </div>
      <HorizontalProgress
        total={totalIntake.calories}
        recommended={recommendedIntake.calories}
        color="progress-primary"
        name="Calories"
      />
    </div>
  );
};

export default NutrientsVisitation;
