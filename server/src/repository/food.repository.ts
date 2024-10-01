import { CleanFoodDataEntity } from "@/entities/clean_food_data.entity";
import { Food } from "@/interfaces/food.interface";
import { getRepository, Repository } from "typeorm";

export class FoodRepository extends Repository<Food> {
  static async findOne(key: object): Promise<{
    id: number;
    name: string;
    serving_size: number;
    calories: number;
    carbohydrate: number;
    total_fat: number;
    cholesterol: number;
    protein: number;
    fiber: number;
    sugars: number;
  }> {
    return await getRepository(CleanFoodDataEntity).findOne({
      where: key,
      select: [
        "id",
        "name",
        "serving_size",
        "calories",
        "carbohydrate",
        "total_fat",
        "cholesterol",
        "protein",
        "fiber",
        "sugars",
      ],
    });
  }
}
