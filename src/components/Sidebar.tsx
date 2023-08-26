import {useContext} from 'react';
import AuthContext from '../contexts/rename/AuthContext';
import {Link} from 'react-router-dom';

const Sidebar = () => {
	const {user} = useContext(AuthContext);
	const userLinks = [
		{
			to: '/app/incidents',
			name: 'Incidents',
			icon: '/report.svg',
		},
		{
			to: '/app/feedback',
			name: 'Feedback',
			icon: '/feedback.svg',
		},
		{
			to: '/app/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			to: '/app/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	const adminLinks = [
		{
			to: '/admin/dashboard',
			name: 'Dashboard',
			icon: '/dashboard.svg',
		},
		{
			to: '/admin/my-tasks',
			name: 'My Cases',
			icon: '/report.svg',
		},
		{
			to: '/admin/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			to: '/admin/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	const superAdminLinks = [
		{
			to: '/admin/dashboard',
			name: 'Dashboard',
			icon: '/dashboard.svg',
		},
		{
			to: '/admin/incidents',
			name: 'Incidents',
			icon: '/report.svg',
		},
		{
			to: '/admin/my-tasks',
			name: 'My Task',
			icon: '/report.svg',
		},
		{
			to: '/admin/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			to: '/admin/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	return (
		<div className='flex-shrink-0 hidden lg:flex w-[320px] mr-[60px] h-full sidebar text-white bg-black flex-col gap-[48px] py-[30px] px-[42px]'>
			<Link to='/'>
				<div className='mb-[60px] flex gap-x-[16px]'>
					<p className='text-[28px] font-medium'>FairSpace</p>
				</div>
			</Link>

			{user?.isAdmin
				? adminLinks.map((link, index) => (
						<Link key={index} to={link.to}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</Link>
				  ))
				: user?.isSuperAdmin
				? superAdminLinks.map((link, index) => (
						<Link key={index} to={link.to}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</Link>
				  ))
				: userLinks.map((link, index) => (
						<Link key={index} to={link.to}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</Link>
				  ))}
		</div>
	);
};
export default Sidebar;
