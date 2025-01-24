import { BrowserRouter as Router, Route, Routes } from "react-router"
import { Suspense, lazy } from "react"

// layout imports
import { ROUTES } from "../constants/constants"
import Loading from "../components/loading/Loading"
import MainLayout from "../components/layouts/main.layout"
import Dashboard from "../pages/Dashboard"
import GenderAnalytics from "../pages/GenderAnalytics"
import UsersList from "../pages/UsersList"

// Lazy loading components
const NotFound = lazy(() => import("../components/error/NotFound"))

const MyRoutes = () => {
	return (
		<Router>
			<Suspense
				fallback={
					<div>
						<Loading />
					</div>
				}
			>
				<Routes>
					<Route path="admin" element={<MainLayout />}>
						<Route
							path={ROUTES.dashboard}
							element={<Dashboard />}
						/>
						<Route path={ROUTES.users} element={<UsersList />} />
						<Route
							path={ROUTES.genderAnalytics}
							element={<GenderAnalytics />}
						/>
						{/* <Route path={ROUTES.dashboard} element={<Dashboard />} /> */}
						{/* <Route path={ROUTES.users} element={<ProfileEditPage />} /> */}
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	)
}

export default MyRoutes

