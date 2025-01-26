import React, { useEffect, useState } from "react";
import { getDailyIntake, getProfile } from "../../../api/user.api";
import { TUser } from "../../../types/user";
import {
  DailyIntake,
  NutritionResponse,
  // Recommendation,
  RecommendedIntake,
  TotalIntake,
} from "../../../types/nutrients";
import FoodList from "./foods/FoodList";
import BottomNav from "../../../components/bottom-nav/BottomNav";
import DashboardTopNav from "../../../components/top-nav/Dashboard.topNav";
import useUserDataStore from "../../../hooks/store/userData.store";
import DailyIntakeComponent from "../../../components/meals/DailyIntake";
import { MdAdd } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import NutrientsVisualization from "../../../components/visualization/NutrientsVisualization";
import { useNavigate } from "react-router";
import useRecommendedFoodStore from "../../../hooks/store/recommendedFood.store";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<TUser>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const { setRecommendedFood } = useRecommendedFoodStore()
  const { setUserData } = useUserDataStore();
  const navigate = useNavigate();

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
      setRecommendedFood({
        calories: dashBoardResponse.recommendedIntake.calories,
        carbohydrate: dashBoardResponse.recommendedIntake.carbohydrate,
        total_fat: dashBoardResponse.recommendedIntake.total_fat,
        cholesterol: dashBoardResponse.recommendedIntake.cholesterol,
        protein: dashBoardResponse.recommendedIntake.protein,
        fiber: dashBoardResponse.recommendedIntake.fiber,
        sodium: dashBoardResponse.recommendedIntake.sodium,
        calcium: dashBoardResponse.recommendedIntake.calcium,
      })

    };
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, bottomNav]);


  return (
    <div className="min-h-screen bg-base-100">
      <div className="mb-20">
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
                  <div className="group transition-all duration-300" onClick={() => navigate("/user/add-food")}>
                    <MdAdd className="mx-3 transition-all duration-300 group-hover:hidden group-hover:opacity-0" />
                    <IoAddCircleOutline className="mx-3 hidden text-primary opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100" />
                  </div>
                </div>
                <DailyIntakeComponent dailyIntake={dailyIntake} />
              </div>
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
