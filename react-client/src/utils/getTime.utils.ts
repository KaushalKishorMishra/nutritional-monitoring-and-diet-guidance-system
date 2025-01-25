import { mealType } from "../enums/project.enums";

export const getMealTime = (time: string) => {
    // Split the time string into hours and minutes
    const [hourStr] = time.split(":");
    // Convert the hour part to a number    if (time >= 0 && time < 6) return mealType.SNACK;
    const hour = parseInt(hourStr, 10);

    if (hour >= 0 && hour < 6) return mealType.SNACK;
    if (hour >= 6 && hour < 10) return mealType.BREAKFAST;
    if (hour >= 10 && hour < 15) return mealType.LUNCH;
    if (hour >= 15 && hour < 18) return mealType.SNACK;
    if (hour >= 18 && hour < 22) return mealType.DINNER;
    if (hour >= 22 && hour < 24) return mealType.SNACK;
    return "It's not meal!";
}


export const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};


