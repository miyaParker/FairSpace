import {Navigate} from 'react-router-dom';
import {ReactNode} from 'react';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const user = localStorage.getItem('user');

	if (!user) {
		return <Navigate to='/auth/login' replace />;
	}
	return children;
};
export default ProtectedRoute;
