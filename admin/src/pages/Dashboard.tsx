import React from "react"
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon"
import UsersIcon from "@heroicons/react/24/outline/UsersIcon"
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon"
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon"
import DashboardStats from "../components/dashboard/DashboardStats"

const statsData = [
	{
		title: "New Users",
		value: "34.7k",
		icon: <UserGroupIcon className="h-8 w-8" />,
		description: "↗︎ 2300 (22%)",
	},
	{
		title: "Total Sales",
		value: "$34,545",
		icon: <CreditCardIcon className="h-8 w-8" />,
		description: "Current month",
	},
	{
		title: "Pending Leads",
		value: "450",
		icon: <CircleStackIcon className="h-8 w-8" />,
		description: "50 in hot leads",
	},
	{
		title: "Active Users",
		value: "5.6k",
		icon: <UsersIcon className="h-8 w-8" />,
		description: "↙ 300 (18%)",
	},
]

const Dashboard: React.FC = () => {
	return (
		<div className="w-full bg-[#191e24] p-6">
			<div className="mt-2 grid h-32 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{statsData.map((d, k) => {
					return <DashboardStats key={k} {...d} colorIndex={k} />
				})}
			</div>
		</div>
	)
}

export default Dashboard

