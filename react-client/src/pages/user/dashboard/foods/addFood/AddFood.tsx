import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import DailyTrack from '../../../../../components/modal/dailyTrack/DailyTrack';
import { toast } from 'react-toastify';
import { addFoodIntake } from '../../../../../api/user.api'; // Ensure this import is correct
import { CgAdd } from 'react-icons/cg';
import { useModalStore } from '../../../../../hooks/store/modal.store';
import { useLoadingStore } from '../../../../../hooks/store/loading.store';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { monthDayYearFormat } from '../../../../../utils/dateFormator.utils';
import { getMealTime } from '../../../../../utils/getTime.utils';
import { capitalizeFirstLetter } from '../../../../../utils/randomUtils.utils';

const AddFood: React.FC = () => {
    const navigate = useNavigate();

    // State for the list of food intake data
    const [listFoodData, setListFoodData] = useState<
        {
            foodName?: string;
            foodId?: string;
            quantity: string; // Quantity in grams (as a string)
            unit: string; // Add unit field
            date: Date;
            mealTime: string;
        }[]
    >([]);

    // State for loading and error
    const { openModal } = useModalStore();
    const { loading, setLoading } = useLoadingStore();
    const [error, setError] = useState<string | null>(null);

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
            setError(
                err?.response?.data?.message || "An error occurred. Please try again."
            );
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

    return (
        <div className="flex h-screen flex-col justify-between items-center mb-5 w-full">
            <div className='w-full'>
                <div className="grid grid-cols-3 items-center p-5 font-nunito-sans text-xl font-semibold">
                    <RxCross2 className="col-span-1" onClick={() => history.back()} />
                    <span className="col-span-1 text-center">Meal </span>
                    <CgAdd className='col-span-1 place-self-end self-auto hover:text-primary' onClick={handleDailyTrack} />
                </div>
                <div className="divider m-0"></div>
                <div>
                    <span className='text-lg font-bold'>Recommended Nutrients</span>
                    recommendedIntake && totalIntake && (
                        
                    )

                </div>

                {/* Display the list of food intake data */}
                <div className="p-5">
                    <h3 className="text-lg font-semibold">Food Intake List</h3>
                    {listFoodData?.length === 0 ? (
                        <p className="text-gray-500">No food intake data available.</p>
                    ) : (
                        <ul className="space-y-3">
                            {listFoodData.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                                >
                                    <div>
                                        <p className="font-medium">{item.foodName}</p>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity} g
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Date: {monthDayYearFormat(item.date.toISOString())}
                                        </p>
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
                    )}
                </div>
            </div>

            {/* Save Button */}
            <button
                className="btn btn-primary w-full font-dm-sans text-lg text-white"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default button behavior
                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Call handleSubmit
                }}
            >
                Save
            </button>
        </div>
    );
};

export default AddFood;