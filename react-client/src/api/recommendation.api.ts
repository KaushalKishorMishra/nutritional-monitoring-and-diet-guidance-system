import axios from "axios";
import { BACKEND_API_URL } from "../config";

export const getRecommendationByNutrition = async (date: Date) => {
    const token = JSON.parse(localStorage.getItem("user-data")!).state.token;
    const response = await axios.get(
        `${BACKEND_API_URL}/user/recommend/nutrition`, {
        params: {
            date: date.toISOString()
        },
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    );
    const responseData = response.data.payload.recommendation;
    return responseData;
}