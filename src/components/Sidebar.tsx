import {useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import {Link} from 'react-router-dom';
import {superAdminLinks, adminLinks, userLinks} from '../constants';

const Sidebar = () => {
	const {user} = useContext(AuthContext);

	return (
		<div className='flex-shrink-0 hidden lg:flex w-[320px] h-full sidebar text-white bg-black flex-col gap-[48px] py-[30px] px-[42px]'>
			<Link to='/'>
				<div className='mb-[60px] flex gap-x-[16px]'>
					<p className='text-[28px] font-medium'>FairSpace</p>
				</div>
			</Link>
			{user && user?.isAdmin
				? adminLinks.map((link, index) => (
						<Link key={index} to={link.to}>
							<div className='flex gap-x-[16px]'>
								<img src={link.icon} width={24} height={24} />
								<p className='text-[22px]'>{link.name}</p>
							</div>
						</Link>
				  ))
				: user && user?.isSuperAdmin
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
