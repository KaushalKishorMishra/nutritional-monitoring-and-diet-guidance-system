import React, { useEffect, useState } from "react";
import { TFoodMinimal } from "../../types/food";
import { listFoods, searchFoodWithNutritionix } from "../../api/food.api";
import ListItemsCard from "../../components/cards/ListItemsCard";
import SearchInputField from "../../components/forms/SearchInputField";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<TFoodMinimal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParameter, setSearchParameter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listFoods(1, 5); // Adjust pagination as required
        setFoods(data.rows);
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
      const data = await searchFoodWithNutritionix(query);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-20">
      <h1 className="mt-4 text-2xl font-bold">Food List</h1>
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

        {foods.length > 0 ? (
          foods.map((food) => (
            <div key={food.id} className="bg-base-200">
              <ListItemsCard title={food.name} key={food.id} />
            </div>
          ))
        ) : (
          <p>No foods found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodList;
