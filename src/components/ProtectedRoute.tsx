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
		// setTimeout(() => {
		// 	const user = localStorage.getItem('user');
		if (!user) {
			console.log(user);
			navigate('/auth/login');
		}
		// }, 3000);
	}, []);

	return children;
};
export default ProtectedRoute;
