import UserContext from './AuthContext';
import {ReactNode, useState} from 'react';

const AuthProvider = ({children}: {children: ReactNode}) => {
	const [user, setUser] = useState<string | null>(localStorage.getItem('user'));

	const login = (cb?: (user) => void) => {
		const userObject = localStorage.getItem('user');
		if (userObject) {
			setUser(userObject);
			const user = JSON.parse(userObject);
			if (typeof cb === 'function') cb(user);
		}
	};

	const logout = (cb) => {
		setUser(null);
		localStorage.removeItem('user');
		if (typeof cb === 'function') cb();
	};

	return (
		<UserContext.Provider value={{user, login, logout}}>
			{children}
		</UserContext.Provider>
	);
};
export default AuthProvider;
