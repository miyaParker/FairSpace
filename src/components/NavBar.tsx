import {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/AuthContext';
import {motion, AnimatePresence} from 'framer-motion';

const NavBar = ({title}: {title: string}) => {
	const {user, login, logout} = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	useEffect(() => {
		login();
	}, []);

	useEffect(() => {
		if (user) {
			setEmail(user.email);
		}
	}, []);

	return (
		<nav className='self-end w-full border-b border-gray border-opacity-20 flex justify-between py-[30px] relative '>
			<h1 className='font-semibold text-[32px]'>{title}</h1>

			<div className='flex gap-[12px] items-center'>
				<img src='/bell.svg' width={24} height={24} />
				<div className='w-[1px] h-[30px] bg-gray/30'></div>
				<div
					className='flex gap-[2px] items-center w-max'
					role='button'
					onClick={() => setShowDropdown(!showDropdown)}>
					<div className='w-[32px] h-[32px] rounded-full flex items-center justify-center'>
						<img src='/profile.svg' width={24} height={24} />
					</div>

					<p className='font-medium'>{email}</p>
					<button>
						<img src='/arrow-down.svg' width={24} height={24} />
					</button>
				</div>
			</div>
			<AnimatePresence>
				{showDropdown ? (
					<motion.div
						initial={{opacity: 0, y: 10}}
						whileInView={{opacity: 1, y: 0}}
						exit={{opacity: 0, y: 20}}
						className='bg-white rounded-[14px] absolute top-[80px] right-[0px] w-[200px] p-[20px] z-50'>
						<p onClick={logout} role='button' className='flex gap-[4px]'>
							Logout
						</p>
					</motion.div>
				) : null}
			</AnimatePresence>
		</nav>
	);
};
export default NavBar;
