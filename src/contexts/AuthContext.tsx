import {createContext} from 'react';

interface userContext {
	user: any;
	login: () => void;
	logout: () => void;
}

const UserContext = createContext({} as userContext);
export default UserContext;
