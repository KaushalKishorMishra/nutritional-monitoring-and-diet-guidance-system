export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN"; // Adjust based on your roles
    isActive: boolean;
    gender: "MALE" | "FEMALE" | "OTHER"; // Or add more gender options if needed
    age: number;
    weight: number;
    height: number;
    activityLevel: 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'SUPER_ACTIVE'; // Adjust if needed
    calorieGoal: number;
    createdAt: string; // You could also use Date if you're working with Date objects
    updatedAt: string; // ISO date string
    calorie: number;
    bmi: number;
};