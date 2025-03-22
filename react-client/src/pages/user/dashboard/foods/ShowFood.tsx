import React, { useEffect, useState } from "react";
import NutritionFacts from "../../../../components/cards/NutrientsFact";
import { useNavigate, useParams } from "react-router";
import { IoChevronBack } from "react-icons/io5";
import { getOneFoodById } from "../../../../api/food.api";
import { toast } from "react-toastify";
import { TDetailedFoodForShowPage } from "../../../../types/food";

const ShowFood: React.FC = () => {
  const id = useParams().id || "";

  const [foodDetails, setFoodDetails] = useState<TDetailedFoodForShowPage | null>(null)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        await getOneFoodById(id).then((response) => {
          setFoodDetails(response)
        })
      }
      catch (err) {
        toast.error(`${err}`)
      }
    }
    fetchFood()
  }, [id])
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
        <IoChevronBack className="col-span-1 cursor-pointer" onClick={() => navigate("/user/dashboard")} />
        <span className="col-span-1 text-center">Food Details</span>
      </div>
      <div className="flex flex-col items-center gap-2 font-dm-sans">
        <div className="text-center">
          <h3 className="text-center font-nunito-sans text-primary text-4xl font-bold">{foodDetails?.name}</h3>
        </div>
      </div>
      <NutritionFacts
        data={foodDetails}
      />
    </div>
  );
};

export default ShowFood;
