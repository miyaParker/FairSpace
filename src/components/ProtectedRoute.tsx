import {useNavigate} from 'react-router-dom';
import {ReactNode, useContext, useEffect} from 'react';
import UserContext from '../contexts/AuthContext';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const {user, login} = useContext(UserContext);

	const navigate = useNavigate();
	useEffect(() => {
		login();
	}, []);

	useEffect(() => {
		console.log(user);
		if (!user) {
			navigate('/auth/login');
		}
	}, []);

	return children;
};
export default ProtectedRoute;
