import React from "react"
import NutritionByGender from "../components/analytics-by-gender/NutritionByGender"
import GenderDistribution from "../components/analytics-by-gender/GenderDistribution"

const GenderAnalytics: React.FC = () => {
	return (
		<div className="w-full bg-[#191e24] p-6">
			<div className="flex flex-col gap-6">
				<div className="max-w-[400px]">
					<GenderDistribution />
				</div>
				<NutritionByGender />
			</div>
		</div>
	)
}

export default GenderAnalytics

