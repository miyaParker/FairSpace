import {useNavigate} from 'react-router-dom';
import {ReactNode, useContext, useEffect} from 'react';
import UserContext from '../contexts/rename/AuthContext';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		console.log('USER', user);
		if (!Object.keys(user).length) {
			navigate('/auth/login');
		}
	}, []);

	return children;
};
export default ProtectedRoute;
