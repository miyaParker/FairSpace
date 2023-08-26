import UserContext from './AuthContext';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AuthProvider = ({children}) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const login = () => {
		const userObject = JSON.parse(localStorage.getItem('user'));
		setUser(userObject);
	};

	const logout = () => {
		const isAdmin = user?.isAdmin || user?.isSuperAdmin;
		localStorage.removeItem('user');
		if (isAdmin) {
			setUser(null);
			navigate('/auth/admin/login');
			return;
		}
		navigate('/auth/login');
	};

	return (
		<UserContext.Provider value={{user, login, logout}}>
			{children}
		</UserContext.Provider>
	);
};
export default AuthProvider;
