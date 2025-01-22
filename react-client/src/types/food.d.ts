export type TFoodMinimal = {
  id: string;
  name: string;
  serving_size: number;
  calories: string;
  carbohydrate: string;
  total_fat: string;
  cholesterol: string;
  protein: string;
  fiber: string;
  sodium: string;
  calcium: string;
};

export type TFoodRecommendationNutrients = {
  calories: number;
  carbohydrate: number;
  total_fat: number;
  cholesterol: number;
  protein: number;
  fiber: number;
  sodium: number;
  calcium: number;
};

export type TRecommendedFoodListFromNutrition = {
  food: TFoodMinimal;
  score: number;
}