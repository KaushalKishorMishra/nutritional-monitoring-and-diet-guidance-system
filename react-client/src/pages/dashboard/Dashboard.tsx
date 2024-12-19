import React, { useEffect, useState } from "react";
import { getProfile, userDashboard } from "../../api/user.api";
import { User } from "../../types/user";
import {
  NutritionResponse,
  Recommendation,
  RecommendedIntake,
  TotalIntake,
} from "../../types/nutrients";
import { FaCalendarAlt, FaRegUser } from "react-icons/fa";
import FoodVisualization from "../../components/visulation/FoodVisulation";
import { LuApple } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import FoodList from "../foods/foodList";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<User>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const recommendedIntake: RecommendedIntake | null =
    dashboardRes?.recommendedIntake || null;
  const totalIntake: TotalIntake | null = dashboardRes?.totalIntake || null;
  const recommendation: Recommendation[] = dashboardRes?.recommendation || [];

  const [bottomNav, setBottomNav] = useState<string>("food");

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profileResponse: any = await getProfile();
      setProfileRes(profileResponse);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dashBoardResponse: any = await userDashboard(date);
      setDashboardRes(dashBoardResponse);
    };
    fetchDashboardData();
  }, [date]);

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
          {profileRes && (
            <h1 className="font-dm-sans font-semibold capitalize">
              {" "}
              {profileRes.name}
            </h1>
          )}
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
            <FoodVisualization
              recommendedIntake={recommendedIntake}
              totalIntake={totalIntake}
            />
            <div className="my-4 flex flex-col gap-4">
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
          </>
        )}
      </div>
      {/* bottom nav */}
      <div className="fixed bottom-0 left-0 flex h-20 w-full flex-row items-center justify-evenly bg-[#dbfbed]">
        <div
          className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "food" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
          onClick={() => setBottomNav("food")}
        >
          <LuApple className="text-xl font-bold" />
          <span className="text-sm font-bold">Food</span>
        </div>
        <div
          className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "report" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
          onClick={() => setBottomNav("report")}
        >
          <HiOutlineDocumentReport className="text-xl font-bold" />
          <span className="text-sm font-bold">Report</span>
        </div>
        <div
          className={`flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full ${bottomNav === "profile" ? "bg-[#2fcb8d] text-white" : "text-[#2fcb8d]"}`}
          onClick={() => setBottomNav("profile")}
        >
          <FaRegUser className="text-xl font-bold" />
          <span className="text-sm font-bold">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
