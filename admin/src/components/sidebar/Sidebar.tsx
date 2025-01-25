import React from "react"
import SidebarSubmenu from "./SidebarSubmenu"
import routes from "../../constants/routes"
import { NavLink, useLocation } from "react-router"

const Sidebar: React.FC = () => {
	const location = useLocation()

	return (
		<div className="sticky top-0 h-screen max-h-screen w-[320px]">
			<h1 className="my-2 w-full text-center text-xl font-semibold">
				NutriTrack
			</h1>
			<ul className="menu w-full bg-base-100 pt-2 text-base-content">
				{routes.map((route, k) => {
					return (
						<li className="" key={k}>
							{route.submenu ? (
								<SidebarSubmenu {...route} />
							) : (
								<NavLink
									end
									to={route.path}
									className={({ isActive }) =>
										`${isActive ? "bg-base-200 font-semibold" : "font-normal"}`
									}
								>
									{route.icon} {route.name}
									{location.pathname === route.path ? (
										<span
											className="absolute inset-y-0 left-0 w-1 rounded-br-md rounded-tr-md bg-primary"
											aria-hidden="true"
										></span>
									) : null}
								</NavLink>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Sidebar

