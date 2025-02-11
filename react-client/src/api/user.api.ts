import axios from "axios";
import { BACKEND_API_URL } from "../config";
import { TUser } from "../types/user";
import { NutritionResponse, ReportResponse } from "../types/nutrients";
import { getMealTime } from "../utils/getTime.utils";

export const updateUserDetails = async (data: {
  gender: string;
  weight: string;
  height: string;
  age: string;
  activityLevel: string;
}) => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;

  const response = await axios.put(
    `${BACKEND_API_URL}/user/update`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;

  const response = await axios.get(`${BACKEND_API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData: Partial<TUser> = response.data.payload;
  return responseData;
};

export const getDailyIntake = async (date: Date) => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;

  const response = await axios.get(
    `${BACKEND_API_URL}/user/track/daily-intake/${date.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const responseData: NutritionResponse = response.data.payload;
  return responseData;
};

export const addFoodIntake = async (
  foodId: string,
  quantity: number,
  date: Date,
  mealTime: string,
) => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;
  const quantityDivided = quantity / 100;
  mealTime = getMealTime(mealTime);
  const response = await axios.post(
    `${BACKEND_API_URL}/user/track`,
    {
      foodId: foodId.toString(),
      quantity: quantityDivided,
      date: date.toISOString(),
      mealType: mealTime,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const responseData = response.data.payload;

  return responseData;
};

export const userFeedback = async (data: { comment: string }) => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;

  const response = await axios.post(
    `${BACKEND_API_URL}/user/feedback`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getReport = async () => {
  const token = JSON.parse(localStorage.getItem("user-data")!).state.token;
  const response = await axios.get(`${BACKEND_API_URL}/user/report`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData: ReportResponse = response.data.payload;
  return responseData;
};
