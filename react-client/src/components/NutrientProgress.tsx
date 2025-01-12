import React from "react";

interface Intake {
  calories: number;
  carbohydrate: number;
  total_fat: number;
  cholesterol: number;
  protein: number;
  fiber: number;
  sugars: number;
  sodium: number;
  vitamin_d: number;
  calcium: number;
  iron: number;
  caffeine: number;
}

interface ProgressProps {
  totalIntake: Intake;
  recommendedIntake: Intake;
}

const NutrientProgress = ({
  totalIntake,
  recommendedIntake,
}: ProgressProps) => {
  const createRadialProgress = (key: keyof Intake, label: string) => {
    const value = (totalIntake[key] / recommendedIntake[key]) * 100;

    return (
      <div
        key={key}
        className="flex flex-col items-center justify-center gap-2"
      >
        <div
          className="radial-progress bg-[#dbfbed] text-primary"
          style={
            {
              "--value": Math.min(value, 100),
            } as React.CSSProperties
          }
          role="progressbar"
        >
          {value.toFixed(0)}%
        </div>
        <p className="font-semibold text-primary">{label}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {createRadialProgress("calories", "Calories")}
      {createRadialProgress("carbohydrate", "Carbohydrate")}
      {createRadialProgress("total_fat", "Total Fat")}
      {/* {createRadialProgress("cholesterol", "Cholesterol")} */}
      {createRadialProgress("protein", "Protein")}
      {createRadialProgress("fiber", "Fiber")}
      {createRadialProgress("sugars", "Sugars")}
      {/* {createRadialProgress("sodium", "Sodium")} */}
      {createRadialProgress("vitamin_d", "Vitamin D")}
      {/* {createRadialProgress("calcium", "Calcium")} */}
      {/* {createRadialProgress("iron", "Iron")} */}
      {createRadialProgress("caffeine", "Caffeine")}
    </div>
  );
};

export default NutrientProgress;
