import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/user/Login';
import Incidents from './pages/Incidents';
import ProtectedRoute from './components/ProtectedRoute';
import LearningHub from './pages/LearningHub';
import Signup from './pages/user/Signup';
import AuthProvider from './contexts/AuthProvider';
import AdminLogin from './pages/admin/Login';
import AdminSignup from './pages/admin/Signup';
import Dashboard from './pages/admin/Dashboard';
import IncidentDetails from './pages/IncidentDetails';
import {useContext} from 'react';
import UserContext from './contexts/AuthContext';
import MyTasks from './pages/MyTasks';
import Events from './pages/Events';

function App() {
	const {user} = useContext(UserContext);
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path=''
						element={
							user?.isAdmin || user?.isSuperAdmin ? <AdminLogin /> : <Login />
						}
					/>
					<Route path='/auth/login' element={<Login />} />
					<Route path='/auth/register' element={<Signup />} />
					<Route path='/auth/admin/login' element={<AdminLogin />} />
					<Route path='/auth/admin/register' element={<AdminSignup />} />
					<Route
						path='/app/incidents'
						element={
							<ProtectedRoute>
								<Incidents />
							</ProtectedRoute>
						}
					/>

					<Route
						path='/admin/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin/my-tasks'
						element={
							<ProtectedRoute>
								<MyTasks />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin/incidents'
						element={
							<ProtectedRoute>
								<Incidents />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin/incidents/:incidentId'
						element={
							<ProtectedRoute>
								<IncidentDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/app/incidents/:incidentId'
						element={
							<ProtectedRoute>
								<IncidentDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin/learning-hub'
						element={
							<ProtectedRoute>
								<LearningHub />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/app/events'
						element={
							<ProtectedRoute>
								<Events />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/admin/events'
						element={
							<ProtectedRoute>
								<Events />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/app/learning-hub'
						element={
							<ProtectedRoute>
								<LearningHub />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
