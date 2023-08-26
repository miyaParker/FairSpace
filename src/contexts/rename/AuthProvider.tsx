import UserContext from './AuthContext';
import {ReactNode, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import User = firebase.User;

const AuthProvider = ({children}: {children: ReactNode}) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(
		{} as User & {isAdmin: boolean; isSuperAdmin: boolean; role: string}
	);

	const login = () => {
		const userObject = localStorage.getItem('user');
		if (userObject) setUser(JSON.parse(userObject));
	};

	const logout = () => {
		const isAdmin = user?.isAdmin || user?.isSuperAdmin;
		localStorage.removeItem('user');
		if (isAdmin) {
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
