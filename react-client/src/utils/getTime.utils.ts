import { mealType } from "../enums/project.enums";

const getMealTime = (date: Date) => {
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) return mealType.SNACK;
    if (hours >= 6 && hours < 10) return mealType.BREAKFAST;
    if (hours >= 12 && hours < 15) return mealType.LUNCH;
    if (hours >= 15 && hours < 18) return mealType.SNACK;
    if (hours >= 18 && hours < 22) return mealType.DINNER;
    if (hours >= 22 && hours < 24) return mealType.SNACK;
    return "It's not meal!";
}

export default getMealTime;