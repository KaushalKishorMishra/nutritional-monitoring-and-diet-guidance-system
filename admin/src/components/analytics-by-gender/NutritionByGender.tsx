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
import { useEffect, useState } from "react"
import config from "../../constants/config"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const NutritionByGender = () => {
	type TRecommendedIntake = {
		calories: number
		carbohydrate: number
		total_fat: number
		cholesterol: number
		protein: number
		fiber: number
		sodium: number
		calcium: number
	}
	type TGenderNutrients = {
		maleNutrients: TRecommendedIntake
		femaleNutrients: TRecommendedIntake
		otherNutrients: TRecommendedIntake
	}
	const [nutrientData, setNutrientData] = useState<TGenderNutrients | null>(
		null
	)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/monthly-intake/gender`
				)
				const data: {
					payload: TGenderNutrients
				} = await response.json()
				setNutrientData(data.payload)
				setReady(true)
				console.log(data.payload)
			} catch (error) {
				console.error("Error fetching users:", error)
			}
		}

		fetchUsers()
	}, [])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	}

	const labels = [
		"Calories",
		"Carbohydrate  (g)",
		"Total Fat (g)",
		"Protein (g)",
		"Fiber (Fg)",
		"Cholesterol (dg)",
		"Sodium (dg)",
		"Calcium (dg)",
	]

	const generateDataSet = (nutrient: TRecommendedIntake) => {
		if (!nutrient) {
			return []
		}
		return [
			nutrient.calories / 30 || 0,
			nutrient.carbohydrate / 30 || 0,
			nutrient.total_fat / 30 || 0,
			nutrient.protein / 30 || 0,
			nutrient.fiber / 30 || 0,
			(nutrient.cholesterol * 100) / 30 || 0,
			(nutrient.sodium * 100) / 30 || 0,
			(nutrient.calcium * 100) / 30 || 0,
		]
	}

	if (!ready) {
		return <div>Loading...</div>
	}
	if (!nutrientData) {
		return <div>No data found</div>
	}

	const data = {
		labels,
		datasets: [
			{
				label: "Male",
				data: generateDataSet(nutrientData.maleNutrients),
				backgroundColor: "rgba(53, 162, 235, 1)",
			},
			{
				label: "Female",
				data: generateDataSet(nutrientData.femaleNutrients),
				backgroundColor: "rgba(255, 99, 132, 1)",
			},
			{
				label: "Other",
				data: generateDataSet(nutrientData.otherNutrients),
				backgroundColor: "rgb(128, 128, 128)",
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

