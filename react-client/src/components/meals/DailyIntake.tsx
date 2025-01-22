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
            title={intake.Food.name}
            cal={convertUnits(intake.Food.calories, "kcl")}
            time={timeOnlyFormat(intake.date)}
          />
          {/* <div>
                            <h2 className="mb-2 border-b text-lg font-semibold">
                              {intake.Food.name}&nbsp;&nbsp;&nbsp;
                            </h2>
                            <p>
                              <strong>Quantity Eaten:</strong>{" "}
                              {intake.quantity * intake.Food.serving_size}
                            </p>
                            <p>
                              <strong>Serving Size:</strong>{" "}
                              {convertUnits(intake.Food.serving_size, "g")}
                            </p>
                            <p>
                              <strong>Calories:</strong>{" "}
                              {convertUnits(intake.Food.calories, "kcal")}
                            </p>
                            <p>
                              <strong>Protein:</strong>{" "}
                              {convertUnits(intake.Food.protein, "g")}
                            </p>
                            <p>
                              <strong>Total Fat:</strong>{" "}
                              {convertUnits(intake.Food.total_fat, "g")}
                            </p>
                          </div> */}
        </div>
      ))}
    </div>
  );
};

export default DailyIntakeComponent;
