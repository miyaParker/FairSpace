import {useContext} from 'react';
import AuthContext from '../contexts/rename/AuthContext';

const Sidebar = () => {
	const {user} = useContext(AuthContext);
	const userLinks = [
		{
			href: '/app/incidents',
			name: 'Incidents',
			icon: '/report.svg',
		},
		{
			href: '/app/feedback',
			name: 'Feedback',
			icon: '/feedback.svg',
		},
		{
			href: '/app/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			href: '/app/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	const adminLinks = [
		{
			href: '/admin/dashboard',
			name: 'Dashboard',
			icon: '/dashboard.svg',
		},
		{
			href: '/admin/my-tasks',
			name: 'My Cases',
			icon: '/report.svg',
		},
		{
			href: '/admin/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			href: '/admin/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	const superAdminLinks = [
		{
			href: '/admin/dashboard',
			name: 'Dashboard',
			icon: '/dashboard.svg',
		},
		{
			href: '/admin/incidents',
			name: 'Incidents',
			icon: '/report.svg',
		},
		{
			href: '/admin/my-tasks',
			name: 'My Task',
			icon: '/report.svg',
		},
		{
			href: '/admin/learning-hub',
			name: 'Learning Hub',
			icon: '/learning.svg',
		},
		{
			href: '/admin/resources',
			name: 'Resources',
			icon: '/resources.svg',
		},
	];
	return (
		<div className='flex-shrink-0 hidden lg:flex w-[320px] mr-[60px] h-full sidebar text-white bg-black flex-col gap-[48px] py-[30px] px-[42px]'>
			<a href='/'>
				<div className='mb-[60px] flex gap-x-[16px]'>
					<p className='text-[28px] font-medium'>FairSpace</p>
				</div>
			</a>

			{user?.isAdmin
				? adminLinks.map((link, index) => (
						<a key={index} href={link.href}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</a>
				  ))
				: user?.isSuperAdmin
				? superAdminLinks.map((link, index) => (
						<a key={index} href={link.href}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</a>
				  ))
				: userLinks.map((link, index) => (
						<a key={index} href={link.href}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</a>
				  ))}
		</div>
	);
};
export default Sidebar;
