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

export type TDetailedFoodForShowPage = {
  id: number;
  name: string;
  serving_size: number;
  calories: number;
  total_fat: number;
  saturated_fat: number;
  cholesterol: number;
  sodium: number;
  choline: number;
  vitamin_a: number;
  vitamin_b12: number;
  vitamin_b6: number;
  vitamin_c: number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  calcium: number;
  copper: number;
  iron: number;
  magnesium: number;
  manganese: number;
  phosphorous: number;
  potassium: number;
  zinc: number;
  protein: number;
  glutamic_acid: number;
  glycine: number;
  carbohydrate: number;
  fiber: number;
  sugars: number;
  fructose: number;
  galactose: number;
  glucose: number;
  lactose: number;
  maltose: number;
  sucrose: number;
  fat: number;
  saturated_fatty_acids: number;
  fatty_acids_total_trans: number | null;
  alcohol: number;
  ash: number;
  caffeine: number;
  water: number;
  createdAt: string;
  updatedAt: string;
};