import axios from "axios";
import { BACKEND_API_URL, VITE_NUTRITIONIX_APP_ID, VITE_NUTRITIONIX_APP_KEY } from "../config";
import { TDetailedFoodForShowPage } from "../types/food";

const headersObject = {
    'Content-Type': 'application/json',
    'x-app-id': VITE_NUTRITIONIX_APP_ID,
    'x-app-key': VITE_NUTRITIONIX_APP_KEY
}

export const listFoods = async (page: number, limit: number) => {
    const response = await axios.get(
        `${BACKEND_API_URL}/f/foods?page=${page}&limit=${limit}`,
    );
    const responseData = response.data.payload;
    return responseData;
};

export const searchFoodWithNutritionix = async (query: string) => {

    const response = await axios.get(
        `${BACKEND_API_URL}/natural/nutrients`, {
        params: {
            query: query
        },
        headers: headersObject
    }
    );
    console.log(response.data)
    const responseData = response.data
    return responseData;
}

export const getFoodByNameFromDataBase = async (query: string) => {
    const response = await axios.get(
        `${BACKEND_API_URL}/f/search`,
        {
            params: {
                name: query
            }
        }
    );
    const responseData = response.data.payload;
    return responseData;
}


export const getOneFoodById = async (id: string): Promise<TDetailedFoodForShowPage> => {
    const response = await axios.get(
        `${BACKEND_API_URL}/f/food/${id}`,
    );
    const responseData = response.data.payload;
    return responseData;
}