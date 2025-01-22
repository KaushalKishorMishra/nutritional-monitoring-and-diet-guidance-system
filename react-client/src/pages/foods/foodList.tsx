import React, { useEffect, useState } from "react";
import {
  TFoodMinimal,
  TRecommendedFoodListFromNutrition,
} from "../../types/food";
import { getFoodByNameFromDataBase } from "../../api/food.api";
import ListItemsCard from "../../components/cards/ListItemsCard";
import SearchInputField from "../../components/forms/SearchInputField";
import { getRecommendationByNutrition } from "../../api/recommendation.api";
import Loading from "../../components/lodaing/Loading";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<TRecommendedFoodListFromNutrition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParameter, setSearchParameter] = useState<string>("");

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

  const handleSearchData = async (query: string) => {
    try {
      // const data = await searchFoodWithNutritionix(query);
      const data = await getFoodByNameFromDataBase(query);
      return data.rows; // Ensure this matches the expected API response
    } catch (err) {
      console.error("Search failed:", err);
      return [];
    }
  };

  const handleSelectFood = (id: string) => {
    console.log("Selected Food ID:", id);
    // Optionally, fetch or filter details for the selected food if needed
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-5 mb-20">
      <h1 className="mt-4 text-2xl font-bold">Search Food</h1>
      <div className="my-4 flex flex-col gap-4">
        <SearchInputField<TFoodMinimal>
          label="Search Food"
          id="searchFood"
          name="searchFood"
          value={searchParameter}
          onChange={(e) => setSearchParameter(e.target.value)}
          required
          fetchData={handleSearchData} // Fetch function for search
          renderResults={(food) => food.name} // Display food name in dropdown
          getId={(food) => food.id.toString()} // Extract food ID
          onSelect={handleSelectFood} // Handle selection
        />

        <div className="my-4 w-full">
          <h2 className="mb-2 ps-1 text-start font-nunito-sans font-semibold">
            Recommended Foods For You
          </h2>
          <div className="flex flex-col gap-4">
            {foods?.length > 0 ? (
              foods.map((food) => (
                <div key={food.food.id} className="relative">
                  {loading ? (
                    <Loading />
                  ) : (
                    <ListItemsCard
                      title={food.food.name}
                      key={food.food.id}
                      cal={food.food.calories}
                      type={"foodList"}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="w-full py-5 text-center font-nunito-sans text-lg font-semibold">
                No foods found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodList;
