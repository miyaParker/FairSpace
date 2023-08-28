import {createContext} from 'react';

import {IUserContext} from '../types';
const UserContext = createContext({} as IUserContext);
export default UserContext;
