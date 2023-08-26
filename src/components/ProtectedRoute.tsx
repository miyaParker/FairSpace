import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../contexts/rename/AuthContext';

const ProtectedRoute = ({children}) => {
	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	if (!user) {
		navigate('/auth/login');
	}
	return children;
};
export default ProtectedRoute;
