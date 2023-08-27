import {createAdmin} from '../../services/firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/AuthContext';

const AdminSignup = () => {
	const {user: authUser, login} = useContext(UserContext);
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (authUser) navigate('/admin/dashboard');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.email && user.password) {
			createAdmin(user).then((res) => {
				if (res && res?.user) {
					login();
					setTimeout(() => {
						navigate('/admin/dashboard');
					}, 3000);
				} else {
					if (res && res?.error) setError(res.error);
				}
			});
		}
	};
	return (
		<div className='h-screen flex p-[20px] bg-black'>
			<form
				className='max-w-[650px] mx-auto h-full bg-red'
				onSubmit={handleSubmit}>
				<h1 className='mt-[150px] text-[48px] text-white max-w-[550px] text-center mx-auto'>
					Create an Admin Account for FairSpace
				</h1>
				<div className='mt-[80px] mx-auto w-max'>
					<label className='block mb-[20px] text-white'>Email Address</label>
					<input
						value={user.email}
						onChange={(e) => setUser({...user, email: e.target.value})}
						type='email'
						className='block text-white bg-transparent border border-white border-1 rounded-[32px] w-[400px] p-[20px]'
					/>
				</div>
				<div className='mt-[40px] mx-auto w-max mx-auto'>
					<label className='block mb-[20px] text-white'>Password</label>
					<input
						value={user.password}
						onChange={(e) => setUser({...user, password: e.target.value})}
						type='password'
						className='text-white bg-transparent border border-white border-1 rounded-[32px] w-[400px] p-[20px] placeholder:text-[18px]'
					/>
					{error.length ? (
						<p className='py-[20px] text-red-500'>{error}</p>
					) : null}
				</div>

				<button
					type='submit'
					className='mx-auto block mt-[40px] text-[18px] font-medium bg-white rounded-[32px] w-[400px] text-center p-[20px]'>
					Signup
				</button>
				<p className='text-white py-[20px] text-center'>
					Already have an account? <a href='/auth/admin/login'>Login</a>
				</p>
			</form>
		</div>
	);
};
export default AdminSignup;
