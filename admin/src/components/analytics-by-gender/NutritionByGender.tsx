import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import TitleCard from "../Cards/TitleCard"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const NutritionByGender = () => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	}

	const labels = [
		"Calories",
		"Carbohydrate",
		"Total Fat",
		"Cholesterol",
		"Protein",
		"Fiber",
		"Sodium",
		"Calcium",
	]

	const data = {
		labels,
		datasets: [
			{
				label: "Male",
				data: labels.map(() => {
					return Math.random() * 1000 + 500
				}),
				backgroundColor: "rgba(255, 99, 132, 1)",
			},
			{
				label: "Female",
				data: labels.map(() => {
					return Math.random() * 1000 + 500
				}),
				backgroundColor: "rgba(53, 162, 235, 1)",
			},
			{
				label: "Other",
				data: labels.map(() => {
					return Math.random() * 1000 + 500
				}),
				backgroundColor: "gray",
			},
		],
	}

	return (
		<TitleCard title={"Nutrition By Gender"}>
			<Bar options={options} data={data} />
		</TitleCard>
	)
}

export default NutritionByGender

