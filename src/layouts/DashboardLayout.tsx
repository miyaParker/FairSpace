import Sidebar from '../components/Sidebar';
import {ReactNode, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';

const DashboardLayout = ({children}: {children: ReactNode}) => {
	const {login} = useContext(AuthContext);
	login();
	return (
		<div className='bg-lavender bg-opacity-90 font-sans w-full h-screen'>
			<div className='flex h-screen max-w-[2560px] mx-auto '>
				<Sidebar />
				<div className='w-full px-[20px] md:px-[30px] lg:px-[40px] xl:px-[60px]'>
					{children}
				</div>
			</div>
		</div>
	);
};
export default DashboardLayout;
