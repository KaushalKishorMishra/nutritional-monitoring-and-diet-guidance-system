import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TUser } from "../../types/user";

interface TUserDataState {
    name: string;
    id: string;
    email: string;
    role: "USER" | "ADMIN";
    token: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    age: number;
    weight: number;
    height: number;
    activityLevel: 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'SUPER_ACTIVE';
    calorieGoal: number;
    calorie: number;
    bmi: number;
    loggedIn: boolean;
    setUserData: (userData: Partial<TUser>) => void;
    getUserData: () => Partial<TUser>;
    setLoggedIn: (loggedIn: boolean) => void;
    resetUserDataFromLocalStorage: () => void;
    clearUserData: () => void;
}

const useUserDataStore = create<TUserDataState>()(
    persist(
        (set, get) => ({
            name: "",
            id: "",
            email: "",
            role: "USER",
            token: "",
            gender: "MALE",
            age: 0,
            weight: 0,
            height: 0,
            activityLevel: "SEDENTARY",
            calorieGoal: 0,
            calorie: 0,
            bmi: 0,
            loggedIn: false,
            setUserData: (userData: Partial<TUser>) =>
                set(() => ({
                    ...userData,
                    loggedIn: true,
                })),
            getUserData: () => {
                const {
                    name,
                    id,
                    email,
                    role,
                    token,
                    gender,
                    age,
                    weight,
                    height,
                    activityLevel,
                    calorieGoal,
                    calorie,
                    bmi,
                } = get();
                return {
                    name,
                    id,
                    email,
                    role,
                    token,
                    gender,
                    age,
                    weight,
                    height,
                    activityLevel,
                    calorieGoal,
                    calorie,
                    bmi,
                };
            },
            setLoggedIn: (loggedIn: boolean) =>
                set(() => ({
                    loggedIn,
                })),
            clearUserData: () =>
                set(() => ({
                    name: "",
                    id: "",
                    email: "",
                    role: "USER",
                    token: "",
                    gender: "MALE",
                    age: 0,
                    weight: 0,
                    height: 0,
                    activityLevel: "SEDENTARY",
                    calorieGoal: 0,
                    calorie: 0,
                    bmi: 0,
                    loggedIn: false,
                })),
            resetUserDataFromLocalStorage: () => {
                try {
                    const storedData = localStorage.getItem("user-data");
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);

                        // Validate that the parsedData has a "state" key with the expected structure
                        if (parsedData && typeof parsedData === "object" && "state" in parsedData) {
                            set(() => ({
                                ...parsedData.state,
                                loggedIn: true,
                            }));
                        } else {
                            console.warn("Invalid structure in stored user data.");
                        }
                    } else {
                        console.info("No user data found in local storage.");
                    }
                } catch (error) {
                    console.error("Failed to load user data from localStorage:", error);
                }
            },
        }),
        {
            name: "user-data",
            storage: createJSONStorage(() => localStorage),
        }
    )
);


export default useUserDataStore;
