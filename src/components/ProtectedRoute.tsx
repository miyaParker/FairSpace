import {useNavigate} from 'react-router-dom';
import {ReactNode, useEffect} from 'react';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			const user = localStorage.getItem('user');
			if (!user) {
				console.log(user);
				navigate('/auth/login');
			}
		}, 3000);
	}, []);

	return children;
};
export default ProtectedRoute;
