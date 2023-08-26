import Sidebar from '../components/Sidebar';

const DashboardLayout = ({children}) => {
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
