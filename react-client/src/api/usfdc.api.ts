import axios from "axios";
import { USDFC_API_KEY, USDFC_API_URL } from "../config"

export const searchFoodByName = async (name: string) => {
    const response = await axios.get(`${USDFC_API_URL}/foods/search`,
        {
            params: {
                api_key: USDFC_API_KEY,
                query: name,
            }
        })
    const responseData = response.data.foods;
    return responseData;

}