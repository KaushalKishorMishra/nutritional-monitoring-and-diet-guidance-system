import React, { useEffect, useState } from "react";
import {
  TRecommendedFoodListFromNutrition,
} from "../../../../types/food";
import ListItemsCard from "../../../../components/cards/ListItemsCard";
import { getRecommendationByNutrition } from "../../../../api/recommendation.api";
import Loading from "../../../../components/loading/Loading";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<TRecommendedFoodListFromNutrition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getRecommendationByNutrition(new Date()); // Adjust pagination as required
        setFoods(data);
      } catch (err) {
        setError("Failed to load foods");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (error) return <div>{error}</div>;

  return (
    <div className="mx-5">
      <div className="my-4 flex flex-col gap-4">
        <div className="mt-4 mb-48 w-full">
          <h1 className="mb-2 ps-1 text-start font-nunito-sans font-semibold text-xl">
            Recommended Foods For You
          </h1>
          <div className="flex flex-col gap-4">
            {foods?.length > 0 ? (
              foods.map((food) => (
                <div key={food.food.id} className="relative">
                  {loading ? (
                    <Loading />
                  ) : (
                    <ListItemsCard
                      id={food.food.id}
                      title={food.food.name}
                      key={food.food.id}
                      cal={food.food.calories}
                      type={"foodList"}
                    />
                  )}
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodList;
