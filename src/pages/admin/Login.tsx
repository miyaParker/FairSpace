import {signInAdmin} from '../../services/firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/AuthContext';

const AdminLogin = () => {
	const {login} = useContext(UserContext);
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	useEffect(() => {
		login((user) => {
			console.log(user);
			if (user && (user?.isAdmin || user?.isSuperAdmin)) {
				navigate('/admin/dashboard');
			}
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.email && user.password) {
			signInAdmin(user, (isSuperUser) => {
				if (isSuperUser) {
					console.log(localStorage.getItem('user'));
					navigate('/admin/dashboard');
				} else setError('User not authorized');
			});
		}
	};
	return (
		<div className='h-screen flex p-[20px] bg-black mx-auto'>
			<form
				className='w-full max-w-[650px] mx-auto h-full bg-red'
				onSubmit={handleSubmit}>
				<h1 className='mt-[150px] text-[48px] text-white max-w-[550px] text-center mx-auto'>
					Login to FairSpace
				</h1>
				<div className='mt-[80px] mx-auto w-full max-w-[400px]'>
					<label className='block mb-[10px] text-white'>Email Address</label>
					<input
						value={user.email}
						onChange={(e) => setUser({...user, email: e.target.value})}
						type='email'
						className='block text-white bg-transparent border border-white border-1 rounded-[32px] w-full p-[20px]'
					/>
				</div>
				<div className='mt-[40px] w-full max-w-[400px] mx-auto'>
					<label className='block mb-[10px] text-white'>Password</label>
					<input
						value={user.password}
						onChange={(e) => setUser({...user, password: e.target.value})}
						type='password'
						className='text-white bg-transparent border border-white border-1 rounded-[32px] w-full p-[20px] placeholder:text-[18px]'
					/>
				</div>
				{error.length ? (
					<p className='py-[20px] text-red-500'>{error}</p>
				) : null}
				<button
					type='submit'
					className='mx-auto block mt-[30px] text-[18px] font-medium bg-white rounded-[32px] w-full max-w-[400px] text-center p-[20px]'>
					Login
				</button>
				<p className='text-white py-[20px] text-center'>
					Don't have an account? <a href='/auth/admin/register'>Signup</a>
				</p>
			</form>
		</div>
	);
};
export default AdminLogin;
