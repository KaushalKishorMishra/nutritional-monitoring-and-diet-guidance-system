import React from "react"
import UserListView from "../components/list/UserListView"
import { TUser } from "../types/user"
import TitleCard from "../components/Cards/TitleCard"

const users: TUser[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john.doe@example.com",
		password: "password123",
		isActive: true,
		role: "USER",
		gender: "MALE",
		age: 30,
		weight: 70,
		height: 175,
		activityLevel: "MODERATELY_ACTIVE",
		calorieGoal: 2500,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane.smith@example.com",
		password: "password456",
		role: "USER",
		isActive: true,
		gender: "FEMALE",
		age: 28,
		weight: 60,
		height: 165,
		activityLevel: "SEDENTARY",
		calorieGoal: 2200,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

const UsersList: React.FC = () => {
	return (
		<div className="w-full bg-[#191e24] p-6">
			<TitleCard title="Users">
				<UserListView users={users} />
			</TitleCard>
		</div>
	)
}

export default UsersList

