import Sidebar from '../components/Sidebar';
import {ReactNode} from 'react';

const DashboardLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className='bg-lavender bg-opacity-90 font-sans w-full h-screen'>
			<div className='flex h-screen max-w-[2560px] mx-auto pr-[20px]'>
				<Sidebar />
				<div className='w-full'>{children}</div>
			</div>
		</div>
	);
};
export default DashboardLayout;
