import {useContext, useState} from 'react';
import UserContext from '../contexts/rename/AuthContext';
import {motion, AnimatePresence} from 'framer-motion';

const NavBar = ({title}) => {
	const {user, logout} = useContext(UserContext);
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<nav className='self-end w-full border-b border-gray border-opacity-20 flex justify-between mb-[40px] py-[30px] relative '>
			<h1 className='font-semibold text-[32px]'>{title}</h1>

			<div className='flex gap-[12px] items-center'>
				<img src='/bell.svg' width={24} height={24} />
				<div className='w-[1px] h-[30px] bg-gray bg-opacity-50'></div>
				<div
					className='flex gap-[2px] items-center w-max'
					role='button'
					onClick={() => setShowDropdown(!showDropdown)}>
					<div className='w-[32px] h-[32px] rounded-full flex items-center justify-center'>
						<img src='/profile.svg' width={24} height={24} />
					</div>

					<p className='font-medium'>{user.email}</p>
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
						className='bg-white rounded-[14px] absolute top-[80px] right-[0px] w-[200px] p-[20px]'>
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
