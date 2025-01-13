import React, { useEffect, useState } from "react";
import { getProfile, userDashboard } from "../../api/user.api";
import { User } from "../../types/user";
import {
  DailyIntake,
  NutritionResponse,
  Recommendation,
  RecommendedIntake,
  TotalIntake,
} from "../../types/nutrients";
import { FaCalendarAlt } from "react-icons/fa";
import FoodList from "../foods/foodList";
import NutrientProgress from "../../components/NutrientProgress";
import BottomNav from "../../components/bottom-nav/BottomNav";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<User>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const recommendedIntake: RecommendedIntake | null =
    dashboardRes?.recommendedIntake || null;
  const totalIntake: TotalIntake | null = dashboardRes?.totalIntake || null;
  const recommendation: Recommendation[] = dashboardRes?.recommendation || [];
  const dailyIntake: DailyIntake[] = dashboardRes?.dailyIntakeObj || [];

  const [bottomNav, setBottomNav] = useState<string>("report");

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profileResponse: any = await getProfile();
      setProfileRes(profileResponse);
    };
    fetchProfile();
  }, [bottomNav]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dashBoardResponse: any = await userDashboard(date);
      setDashboardRes(dashBoardResponse);
    };
    fetchDashboardData();
  }, [date, bottomNav]);

  const convertUnits = (value: number | string, unit: string): string => {
    if (typeof value === "string") {
      value = parseFloat(value);
    }
    switch (unit) {
      case "g":
        return `${value.toFixed(2)} g`;
      case "kcal":
        return `${value} kcal`;
      default:
        return `${value}`;
    }
  };

  return (
    <div className="relative h-screen">
      <div className="mb-20 px-3 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/apple.svg"
              className="aspect-square w-12 rounded-full border-2 p-1"
            />
            {profileRes && (
              <h1 className="font-dm-sans font-semibold capitalize">
                {" "}
                {profileRes.name}
              </h1>
            )}
          </div>
          <div className="flex items-center justify-end gap-5">
            <label htmlFor="" className="">
              {date.toISOString().split("T")[0]}
            </label>
            <div className="relative">
              <input
                type="date"
                value={date.toISOString()}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="absolute right-0 hidden rounded-lg border-b-2 border-gray-400 bg-white px-4 py-2 focus:outline-primary"
              />
              <FaCalendarAlt
                className="cursor-pointer text-primary"
                onClick={() => {
                  const dateInput = document.querySelector(
                    'input[type="date"]',
                  ) as HTMLInputElement;

                  if (dateInput) {
                    // Add a custom class to the input element
                    dateInput.classList.add("custom-date-input");

                    // Trigger the date picker
                    dateInput.showPicker();
                  }
                }}
              />
            </div>
          </div>
        </div>
        {bottomNav === "food" && <FoodList />}
        {bottomNav === "report" && recommendedIntake && totalIntake && (
          <>
            {/* <FoodVisualization
              recommendedIntake={recommendedIntake}
              totalIntake={totalIntake}
            /> */}

            {/* custom foods visuals */}
            <div className="mt-4 flex flex-wrap items-center justify-evenly gap-2">
              <NutrientProgress
                totalIntake={totalIntake}
                recommendedIntake={recommendedIntake}
              />
            </div>

            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                <div className="text-lg">Daily Intakes:</div>
              </div>
              <div className="collapse-content">
                <div className="my-4 flex flex-col gap-4">
                  {dailyIntake.length === 0 && <p>No Intakes today.</p>}
                  {dailyIntake.map((intake, index) => (
                    <div key={index} className="w-full rounded border p-4">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow mb-20 bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                <div className="text-lg">Recommendations</div>
              </div>
              <div className="collapse-content">
                <div className="my-4 flex flex-col gap-4">
                  {recommendation.length === 0 && <p>No recommendations.</p>}
                  {recommendation.map((recommendation, index) => (
                    <div key={index} className="w-full rounded border p-4">
                      <h2 className="mb-2 border-b text-lg font-semibold">
                        {recommendation.food.name}&nbsp;&nbsp;&nbsp;
                        <span className="text-sm font-normal">
                          {recommendation.score.toFixed(2)}
                        </span>
                      </h2>
                      <p>
                        <strong>Serving Size:</strong>{" "}
                        {convertUnits(recommendation.food.serving_size, "g")}
                      </p>
                      <p>
                        <strong>Calories:</strong>{" "}
                        {convertUnits(recommendation.food.calories, "kcal")}
                      </p>
                      <p>
                        <strong>Protein:</strong>{" "}
                        {convertUnits(recommendation.food.protein, "g")}
                      </p>
                      <p>
                        <strong>Total Fat:</strong>{" "}
                        {convertUnits(recommendation.food.total_fat, "g")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {bottomNav == "profile" && localStorage.getItem("userId")}
      </div>
      {/* bottom nav */}
      <BottomNav setBottomNav={setBottomNav} bottomNav={bottomNav} />
    </div>
  );
};

export default Dashboard;
