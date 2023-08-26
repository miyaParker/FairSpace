import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/user/Login';
import Incidents from './pages/Incidents';
import ProtectedRoute from './components/ProtectedRoute';
import Feedback from './pages/user/Feedback';
import LearningHub from './pages/user/LearningHub';
import Signup from './pages/user/Signup';
import AuthProvider from './contexts/rename/AuthProvider';
import AdminLogin from './pages/admin/Login';
import AdminSignup from './pages/admin/Signup';
import Dashboard from './pages/admin/Dashboard';
import IncidentDetails from './pages/IncidentDetails';
import {useContext} from 'react';
import UserContext from './contexts/rename/AuthContext';

function App() {
	const {user} = useContext(UserContext);
	return (
		<BrowserRouter>
			<AuthProvider>
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
								<Incidents />
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
						path='/admin/feedback'
						element={
							<ProtectedRoute>
								<Feedback />
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
						path='/app/feedback'
						element={
							<ProtectedRoute>
								<Feedback />
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
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
