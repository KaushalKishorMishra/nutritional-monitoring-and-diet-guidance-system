import React from "react"
import { TFoodMinimal } from "../../types/food"

type PFoodListView = {
	foods: TFoodMinimal[] | null
}

const FoodListView: React.FC<PFoodListView> = ({ foods }) => {
	const mapRows = () => {
		if (!foods || foods.length === 0) {
			return (
				<tr>
					<td colSpan={10} className="h-16 text-center">
						No foods found.
					</td>
				</tr>
			)
		}
		return foods.map((food, index) => (
			<tr key={index} className="border-b border-[#191e24]">
				<td>{index + 1}</td>
				<td>{food.id}</td>
				<td>{food.name}</td>
				<td>{food.calories}</td>
				<td>{food.carbohydrate}</td>
				<td>{food.total_fat}</td>
				<td>{food.cholesterol}</td>
				<td>{food.protein}</td>
				<td>{food.fiber}</td>
				<td>{food.sodium}</td>
				<td>{food.calcium}</td>
			</tr>
		))
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Name</th>
						<th>Calories</th>
						<th>Carbohydrate</th>
						<th>Total Fat</th>
						<th>Cholesterol</th>
						<th>Protein</th>
						<th>Fiber</th>
						<th>Sodium</th>
						<th>Calcium</th>
					</tr>
				</thead>
				<tbody>{mapRows()}</tbody>
			</table>
		</div>
	)
}

export default FoodListView

