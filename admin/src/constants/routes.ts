import { RxDashboard } from "react-icons/rx"
import { FiUsers } from "react-icons/fi"
import { PiBowlFood } from "react-icons/pi"
import React from "react"
import { IoMdTransgender } from "react-icons/io"
import { FaRegCalendarAlt } from "react-icons/fa"
import { MdOutlineAnalytics } from "react-icons/md"

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
	{
		path: "/admin/dashboard",
		icon: React.createElement(RxDashboard, { className: iconClasses }),
		name: "Dashboard",
	},
	{
		path: "/admin/users",
		icon: React.createElement(FiUsers, { className: iconClasses }),
		name: "Users",
	},
	{
		path: "/admin/foods",
		icon: React.createElement(PiBowlFood, { className: iconClasses }),
		name: "Foods",
	},
	{
		path: "", //no url needed as this has submenu
		icon: React.createElement(MdOutlineAnalytics, {
			className: `${iconClasses} inline`,
		}),
		name: "Analytics",
		submenu: [
			{
				path: "/admin/analytics/gender",
				icon: React.createElement(IoMdTransgender, {
					className: submenuIconClasses,
				}),
				name: "By Gender",
			},
			{
				path: "/admin/analytics/age",
				icon: React.createElement(FaRegCalendarAlt, {
					className: submenuIconClasses,
				}),
				name: "By Age",
			},
		],
	},
]

export default routes

