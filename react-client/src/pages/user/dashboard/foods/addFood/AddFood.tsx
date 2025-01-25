import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { CgAdd } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import DailyTrack from '../../../../../components/modal/dailyTrack/DailyTrack';
import { addFoodIntake } from '../../../../../api/user.api';
import { useModalStore } from '../../../../../hooks/store/modal.store';
import { useLoadingStore } from '../../../../../hooks/store/loading.store';
import { monthDayYearFormat } from '../../../../../utils/dateFormator.utils';
import { getMealTime } from '../../../../../utils/getTime.utils';
import { capitalizeFirstLetter } from '../../../../../utils/randomUtils.utils';
import useRecommendedFoodStore from '../../../../../hooks/store/recommendedFood.store';

// Define types for better type safety
type FoodIntakeItem = {
    foodName?: string;
    foodId?: string;
    quantity: string; // Quantity in grams (as a string)
    unit: string; // Add unit field
    date: Date;
    mealTime: string;
};

const AddFood: React.FC = () => {
    const navigate = useNavigate();

    // State for the list of food intake data
    const [listFoodData, setListFoodData] = useState<FoodIntakeItem[]>([]);

    // State for loading and error
    const { openModal } = useModalStore();
    const { loading, setLoading } = useLoadingStore();
    const [error, setError] = useState<string | null>(null);

    // Global state for recommended nutrients intake amount
    const { calories, carbohydrate, total_fat, cholesterol, protein, fiber, sodium, calcium } = useRecommendedFoodStore();

    // Function to handle form submission (API call)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            // Check if there is any food intake data
            if (listFoodData.length === 0) {
                toast.error("Please add a food item before saving.");
                return;
            }

            // Send each food intake item to the backend
            for (const foodIntake of listFoodData) {
                if (foodIntake.foodId) {
                    // Convert quantity to a number (in grams)
                    const quantityInGrams = parseFloat(foodIntake.quantity);

                    // Send the data to the backend
                    await addFoodIntake(
                        foodIntake.foodId,
                        quantityInGrams, // Quantity in grams (as a number)
                        foodIntake.date,
                        foodIntake.mealTime
                    );
                }
            }

            toast.success("Food intake added successfully!");
            navigate("/user/dashboard");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error:", err);
            setError(err?.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to open the DailyTrack modal
    const handleDailyTrack = () => {
        openModal(
            "Add Food",
            <DailyTrack
                setListFoodData={setListFoodData}
                loading={loading}
                error={error}
                modalName='Add Food'
            />,
            "center",
            false
        );
    };

    // Function to handle deletion of a food intake item
    const handleDelete = (index: number) => {
        setListFoodData((prev) => prev.filter((_, i) => i !== index));
    };

    // Render the list of food intake items
    const renderFoodIntakeList = () => {
        if (listFoodData.length === 0) {
            return <p className="text-gray-500">No food intake data available.</p>;
        }

        return (
            <ul className="space-y-3">
                {listFoodData.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        <div>
                            <p className="font-medium">{item.foodName}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity} g</p>
                            <p className="text-sm text-gray-600">Date: {monthDayYearFormat(item.date.toISOString())}</p>
                            <p className="text-sm text-gray-600">Time: {capitalizeFirstLetter(getMealTime(item.mealTime))}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(index)}
                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                            <MdDelete />
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    // Render the recommended nutrients
    const renderRecommendedNutrients = () => {
        const nutrients = [
            { label: "Calories", value: calories },
            { label: "Carbohydrate", value: carbohydrate },
            { label: "Total Fat", value: total_fat },
            { label: "Cholesterol", value: cholesterol },
            { label: "Protein", value: protein },
            { label: "Fiber", value: fiber },
            { label: "Sodium", value: sodium },
            { label: "Calcium", value: calcium },
        ];

        return (
            <div className='flex font-nunito-sans overflow-scroll text-base gap-x-5 justify-center items-center'>
                {nutrients.map((nutrient, index) => (
                    nutrient.value && (
                        <span key={index} className='text-secondary-content text-sm flex flex-col-reverse items-center'>
                            {nutrient.label} <span className='font-semibold'>{nutrient.value}</span>
                        </span>
                    )
                ))}
            </div>
        );
    };

    return (
        <div className="flex h-screen flex-col justify-between items-center pb-5 w-full">
            <div className='w-full'>
                {/* Header */}
                <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
                    <RxCross2 className="col-span-1 cursor-pointer" onClick={() => navigate('/user/dashboard')} />
                    <span className="col-span-1 text-center">Meal</span>
                    <CgAdd className='col-span-1 place-self-end self-auto hover:text-primary cursor-pointer' onClick={handleDailyTrack} />
                </div>
                <div className="divider m-0"></div>

                {/* Recommended Nutrients */}
                <div className='px-5'>
                    <span className='text-xl font-bold font-dm-sans'>Recommended Nutrients</span>
                    {renderRecommendedNutrients()}
                </div>
                <div className="divider m-0"></div>

                {/* Food Intake List */}
                <div className="px-5">
                    <h3 className="text-xl font-semibold font-dm-sans">Food Intake</h3>
                    {renderFoodIntakeList()}
                </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-center w-full mx-5'>
                <button
                    className="btn btn-primary w-8/12 font-dm-sans text-lg text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddFood;