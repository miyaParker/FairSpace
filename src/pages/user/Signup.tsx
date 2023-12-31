import {createUser} from '../../services/firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/AuthContext';

const Signup = () => {
	const {user: authUser, login} = useContext(UserContext);
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (authUser) navigate('/app/incidents');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.email && user.password) {
			createUser(user).then((res) => {
				if (res && res?.user) {
					login();
					navigate('/app/incidents');
				} else {
					if (res && res?.error) setError(res.error);
				}
			});
		}
	};
	return (
		<div className='h-screen flex p-[20px] bg-black'>
			<form className='w-1/2 h-full bg-red px-[80px]' onSubmit={handleSubmit}>
				<h1 className='mt-[150px] text-[48px] text-white'>
					Welcome to FairSpace
				</h1>
				<p className='text-[18px] text-white'>
					Empower Equity . Embrace Change . Join FairSpace.
				</p>

				<div className='mt-[120px]'>
					<label className='block mb-[20px] text-white'>Email Address</label>
					<input
						value={user.email}
						onChange={(e) => setUser({...user, email: e.target.value})}
						type='email'
						className='block text-white bg-transparent border border-white border-1 rounded-[32px] w-4/5 p-[20px]'
					/>
				</div>
				<div className='mt-[40px]'>
					<label className='block mb-[20px] text-white'>Password</label>
					<input
						value={user.password}
						onChange={(e) => setUser({...user, password: e.target.value})}
						type='password'
						className='text-white bg-transparent border border-white border-1 rounded-[32px] w-4/5 p-[20px] placeholder:text-[18px]'
					/>
				</div>
				{error.length ? (
					<p className='py-[20px] text-red-500'>{error}</p>
				) : null}
				<button
					type='submit'
					className='mt-[40px] text-[18px] font-medium bg-white rounded-[32px] w-4/5 text-center p-[20px]'>
					Signup
				</button>
				<p className='text-white py-[20px]'>
					Already have an account? <a href='/auth/login'>Login</a>
				</p>
			</form>
			<div className='relative h-full w-1/2 rounded-[18px] overflow-hidden'>
				<img src='/login-cover.jpg' className='cover' />
				<p className='bg-gray bg-opacity-60 p-[20px] rounded-[9px] leading-[120%] max-w-[600px] absolute bottom-[40px] left-[40px] z-40 text-white text-[60px]'>
					Join us in fostering respectful workplaces where every voice matters.
				</p>
				<div className='absolute w-full h-full bottom-0 z-20 bg-black bg-opacity-40'></div>
			</div>
		</div>
	);
};
export default Signup;
