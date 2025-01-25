import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; // Import persist middleware
import { TFoodRecommendationNutrients } from "../../types/food";

interface RecommendedState extends TFoodRecommendationNutrients {
    setRecommendedFood: (food: TFoodRecommendationNutrients) => void;
    clearRecommendedFood: () => void;
}

const useRecommendedFoodStore = create<RecommendedState>()(
    persist(
        (set) => ({
            calories: 0,
            carbohydrate: 0,
            total_fat: 0,
            cholesterol: 0,
            protein: 0,
            fiber: 0,
            sodium: 0,
            calcium: 0,
            setRecommendedFood: (food: TFoodRecommendationNutrients) => set(() => food),
            clearRecommendedFood: () =>
                set(() => ({
                    calories: 0,
                    carbohydrate: 0,
                    total_fat: 0,
                    cholesterol: 0,
                    protein: 0,
                    fiber: 0,
                    sodium: 0,
                    calcium: 0,
                })),
        }),
        {
            name: "recommended-food-store", // Unique name for localStorage
            storage: createJSONStorage(() => sessionStorage), // Use localStorage (default)
            onRehydrateStorage: () => {
                // handle rehydration if needed
            }
        }
    )
);

export default useRecommendedFoodStore;