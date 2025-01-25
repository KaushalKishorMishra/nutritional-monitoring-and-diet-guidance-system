import React from "react";
import { FaChartBar, FaChartPie, FaGithubAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { LuApple } from "react-icons/lu";
import { useNavigate } from "react-router";

const AboutUsPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen">
            <div className=" mx-auto rounded-lg h-full p-5 flex flex-col justify-between">
                {/* Header */}
                <div>
                    <div className="grid grid-cols-3 items-center py-3 font-nunito-sans text-xl font-semibold">
                        <IoIosArrowBack className="col-span-1 cursor-pointer" onClick={() => navigate('/user/profile')} />
                        <span className="col-span-1 text-center">About App</span>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600 text-left my-6">
                        <span className="font-semibold text-primary">Nutritional Monitoring And Diet Guidance System </span>- a Progressive Web App developed and designed to assist you on your journey to achieving your dream physique.
                    </p>

                </div>
                <div className="p-5 bg-neutral/30 text-base-content rounded-lg flex flex-col gap-5">
                    {/* Features Section */}
                    <div className="">
                        <h2 className="text-xl font-semibold text-gray-700">
                            We provide you with all the necessary features such as:
                        </h2>
                        <ul className="flex flex-col gap-2 mt-4">
                            <li className="flex items-center">
                                <span className="text-primary font-bold mr-2">•</span>
                                <span className="text-gray-600">Diary to log your meals</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-primary font-bold mr-2">•</span>
                                <span className="text-gray-600">Reports to keep track of your progress</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-primary font-bold mr-2">•</span>
                                <span className="text-gray-600">Food Nutrients Ingredients</span>
                            </li>
                        </ul>
                    </div>

                    {/* Icons Section */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-white rounded-full p-4">
                                <FaChartPie className="text-xl text-primary-content" />
                            </div>
                            <span className="text-base-300">Diary</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-white rounded-full p-4">
                                <FaChartBar className="text-xl text-primary-content" />
                            </div>
                            <span className="text-base-300">Reports</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-white rounded-full p-4">
                                <LuApple className="text-xl text-primary-content" />
                            </div>
                            <span className="text-base-300">Foods</span>
                        </div>
                    </div>

                </div>
                {/* Source Code Link */}
                <div className="text-center">
                    <a
                        href="https://github.com/KaushalKishorMishra/nutritional-monitoring-and-diet-guidance-system"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex flex-col items-center justify-center gap-2"
                    >
                        Visit Source Code
                        <FaGithubAlt className="text-4xl" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;