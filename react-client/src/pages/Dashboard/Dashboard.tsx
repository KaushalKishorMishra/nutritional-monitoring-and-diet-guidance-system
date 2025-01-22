import React, { useEffect, useState } from "react";
import { getDailyIntake, getProfile } from "../../api/user.api";
import { TUser } from "../../types/user";
import {
  DailyIntake,
  NutritionResponse,
  // Recommendation,
  RecommendedIntake,
  TotalIntake,
} from "../../types/nutrients";
import FoodList from "../foods/foodList";
import BottomNav from "../../components/bottom-nav/BottomNav";
import DashboardTopNav from "../../components/top-nav/Dashboard.topNav";
import useUserDataStore from "../../hooks/store/userData.store";
import DailyIntakeComponent from "../../components/meals/DailyIntake";
import { MdAdd } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import NutrientsVisualization from "../../components/visualization/NutrientsVisualization";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<TUser>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const { setUserData } = useUserDataStore();

  const recommendedIntake: RecommendedIntake | null =
    dashboardRes?.recommendedIntake || null;
  const totalIntake: TotalIntake | null = dashboardRes?.totalIntake || null;
  // const recommendation: Recommendation[] = dashboardRes?.recommendation || [];
  const dailyIntake: DailyIntake[] = dashboardRes?.dailyIntakeObj || [];

  const [bottomNav, setBottomNav] = useState<"food" | "report" | "diary">(
    "diary",
  );

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await getProfile().then((response: any) => {
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
    <div className="relative h-screen bg-white">
      <div className="mb-20 ">
        <div className="sticky top-0 z-10">
          <DashboardTopNav
            profileRes={profileRes}
            date={date}
            setDate={setDate}
            onPage={bottomNav}
          />
        </div>
        <div>
          {bottomNav === "food" && <FoodList />}
          {bottomNav === "diary" && recommendedIntake && totalIntake && (
            <div className="px-5">
              {/* custom foods visuals */}
              <div className="my-4">
                <h4 className="mb-2 ps-1 text-start font-nunito-sans font-semibold">
                  Nutrients Indicator
                  {/* -{" "} */}
                  {/* <span className="text-primary">
                    {monthDayYearFormatForAPI(date.toDateString())}
                  </span> */}
                </h4>
                <NutrientsVisualization
                  recommendedIntake={recommendedIntake}
                  totalIntake={totalIntake}
                />
              </div>
              <div className="my-4">
                <div className="flex items-center justify-between text-lg">
                  <h4 className="mb-1 ps-1 text-start font-nunito-sans font-semibold">
                    Meal
                  </h4>
                  <div className="group transition-all duration-300">
                    <MdAdd className="mx-3 transition-all duration-300 group-hover:hidden group-hover:opacity-0" />
                    <IoAddCircleOutline className="mx-3 hidden text-primary opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100" />
                  </div>
                </div>
                <DailyIntakeComponent dailyIntake={dailyIntake} />
              </div>

              {/* <div className="collapse collapse-arrow mb-20 bg-base-200">
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
              </div> */}
            </div>
          )}
        </div>
      </div>
      {/* bottom nav */}
      <BottomNav setBottomNav={setBottomNav} bottomNav={bottomNav} />
    </div>
  );
};

export default Dashboard;
