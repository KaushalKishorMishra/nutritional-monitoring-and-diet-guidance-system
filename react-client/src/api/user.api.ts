import axios from "axios";
import { BACKEND_API_URL } from "../config";
import { User } from "../types/user";
import { NutritionResponse } from "../types/nutrients";
import { TUserFoodIntakeWithFood } from "../types/userFoodIntake";
import { TFoodMinimal, TFoodRecommendationNutrients } from "../types/food";
import { monthDayYearFormatForAPI } from "../utils/dateFormator.utils";

export const getProfile = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`${BACKEND_API_URL}/user/profile/${userId}`);
  const responseData: User = response.data.payload;
  return responseData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userDashboard = async (date: any | Date) => {
  console.log(date)
  const today = monthDayYearFormatForAPI(date);
  const userId = localStorage.getItem("userId");
  const response = await axios.post(
    `${BACKEND_API_URL}/user/track/daily-intake/${today}`,
    {
      userId: userId,
    },
  );
  const responseData: NutritionResponse = response.data.payload;
  return responseData;
};

export const addFoodIntake = async (
  foodId: string,
  quantity: number,
  date: Date,
) => {
  const userId = localStorage.getItem("userId");
  const today = date.toISOString().split("T")[0];
  const response = await axios.post(`${BACKEND_API_URL}/user/track`, {
    userId: userId,
    foodId: foodId,
    quantity: quantity,
    date: today,
  });
  const responseData = response.data.payload;

  return responseData;
};

export const listFoods = async (page: number, limit: number) => {
  const response = await axios.get(
    `${BACKEND_API_URL}/f/foods?page=${page}&limit=${limit}`,
  );
  const responseData = response.data.payload;
  return responseData;
};

export const getDailyIntake = async (
  date: Date,
): Promise<{
  dailyIntakeObj: TUserFoodIntakeWithFood[];
  totalIntake: TFoodRecommendationNutrients;
  recommendedIntake: TFoodRecommendationNutrients;
  recommendation: {
    food: TFoodMinimal;
    score: number;
  }[];
}> => {
  const today = date.toISOString().split("T")[0];
  const userId = localStorage.getItem("userId");
  const response = await axios.post(
    `${BACKEND_API_URL}/user/track/daily-intake/${today}`,
    {
      userId: userId,
    },
  );
  const responseData = response.data.payload;
  return responseData;
};
