import React, { useEffect, useState } from "react";
import { listFoods } from "../../api/user.api";
import { TFoodMinimal } from "../../types/food";
import { convertUnits } from "../../utils/randomUtils.utils";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<TFoodMinimal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listFoods(1, 100);
        console.log(data);
        setFoods(data.rows);
      } catch (err) {
        console.log(err);
        setError("Failed to load foods");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-20">
      <h1 className="mt-4 text-2xl font-bold">Food List</h1>
      <div className="my-4 flex flex-col gap-4">
        {foods &&
          foods?.map((food) => (
            <div
              key={food.id}
              className="w-full rounded-md border bg-[#f9f9f9] p-4 shadow-sm"
            >
              <h2 className="border-b text-xl font-semibold">{food.name}</h2>
              <p>
                <strong>Serving Size:</strong>{" "}
                {convertUnits(food.serving_size, "g")}
              </p>
              <p>
                <strong>Calories:</strong> {food.calories} kcal
              </p>
              <p>
                <strong>Carbohydrate:</strong>{" "}
                {convertUnits(food.carbohydrate, "g")}
              </p>
              <p>
                <strong>Total Fat:</strong> {convertUnits(food.total_fat, "g")}
              </p>
              <p>
                <strong>Cholesterol:</strong>{" "}
                {convertUnits(food.cholesterol, "mg")}
              </p>
              <p>
                <strong>Protein:</strong> {convertUnits(food.protein, "g")}
              </p>
              <p>
                <strong>Fiber:</strong> {convertUnits(food.fiber, "g")}
              </p>
              <p>
                <strong>Sugars:</strong> {convertUnits(food.sugars, "g")}
              </p>
              <p>
                <strong>Sodium:</strong> {convertUnits(food.sodium, "mg")}
              </p>
              <p>
                <strong>Vitamin D:</strong> {convertUnits(food.vitamin_d, "IU")}
              </p>
              <p>
                <strong>Calcium:</strong> {convertUnits(food.calcium, "mg")}
              </p>
              <p>
                <strong>Iron:</strong> {convertUnits(food.iron, "mg")}
              </p>
              <p>
                <strong>Caffeine:</strong> {convertUnits(food.caffeine, "mg")}
              </p>
            </div>
          ))}
      </div>
      {/* <Pagination
        pagination={pagination}
        setCurrentPage={setPage}
        setPageSize={setLimit}
      /> */}
    </div>
  );
};

export default FoodList;
