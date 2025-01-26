import React from "react";
import { convertUnits } from "../../utils/randomUtils.utils";
import { timeOnlyFormat } from "../../utils/dateFormator.utils";
import ListItemsCard from "../cards/ListItemsCard";
import { DailyIntake } from "../../types/nutrients";

type PDailyIntakeData = {
  dailyIntake: DailyIntake[];
};

const DailyIntakeComponent: React.FC<PDailyIntakeData> = ({ dailyIntake }) => {
  return (
    <div className="flex flex-col gap-4">
      {dailyIntake.length === 0 && <p>No Intakes today.</p>}
      {dailyIntake.map((intake, index) => (
        <div key={index} className="w-full">
          <ListItemsCard
            id={(intake.foodId).toString()}
            title={intake.Food.name}
            cal={convertUnits(intake.Food.calories, "kcl")}
            time={timeOnlyFormat(intake.date)}
          />
        </div>
      ))}
    </div>
  );
};

export default DailyIntakeComponent;
