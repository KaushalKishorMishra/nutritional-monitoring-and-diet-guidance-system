import React, { useEffect, useState } from "react";
import { getDailyIntake, getProfile } from "../../api/user.api";
import { TUser } from "../../types/user";
import {
  DailyIntake,
  NutritionResponse,
  Recommendation,
  RecommendedIntake,
  TotalIntake,
} from "../../types/nutrients";
import FoodList from "../foods/foodList";
import BottomNav from "../../components/bottom-nav/BottomNav";
import DashboardTopNav from "../../components/top-nav/Dashboard.topNav";
import { convertUnits } from "../../utils/randomUtils.utils";
import NutrientsVisitation from "../../components/visulation/NutrientsVisitation";
import ListItemsCard from "../../components/cards/ListItemsCard";
import useUserDataStore from "../../hooks/store/userData.store";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<TUser>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const { setUserData } = useUserDataStore();

  const recommendedIntake: RecommendedIntake | null =
    dashboardRes?.recommendedIntake || null;
  const totalIntake: TotalIntake | null = dashboardRes?.totalIntake || null;
  const recommendation: Recommendation[] = dashboardRes?.recommendation || [];
  const dailyIntake: DailyIntake[] = dashboardRes?.dailyIntakeObj || [];

  const [bottomNav, setBottomNav] = useState<string>("report");

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await getProfile().then((response: any) => {
        console.log("Profile Response: ", response);
        setUserData({ ...response });
        setProfileRes(response);
      });
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomNav]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dashBoardResponse: any = await getDailyIntake(date);
      setDashboardRes(dashBoardResponse);
    };
    fetchDashboardData();
  }, [date, bottomNav]);

  return (
    <div className="relative h-screen">
      <div className="mb-20 px-3 py-5">
        <DashboardTopNav
          profileRes={profileRes}
          date={date}
          setDate={setDate}
        />
        <div>
          {bottomNav === "food" && <FoodList />}
          {bottomNav === "report" && recommendedIntake && totalIntake && (
            <>
              {/* <FoodVisualization
              recommendedIntake={recommendedIntake}
              totalIntake={totalIntake}
              /> */}

              {/* custom foods visuals */}
              <div className="mt-4">
                <h4 className="mb-2 ps-1 text-start font-nunito-sans font-semibold">
                  Nutrients Indicator
                </h4>
                <NutrientsVisitation
                  recommendedIntake={recommendedIntake}
                  totalIntake={totalIntake}
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
                        <ListItemsCard
                          title={intake.Food.name}
                          cal={convertUnits(intake.Food.calories, "kcl")}
                        />
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
        </div>
      </div>
      {/* bottom nav */}
      <BottomNav setBottomNav={setBottomNav} bottomNav={bottomNav} />
    </div>
  );
};

export default Dashboard;
