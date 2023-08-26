import {signInAdmin} from '../../services/auth';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../contexts/rename/AuthContext';

const AdminLogin = () => {
	const {user: authUser, login} = useContext(UserContext);
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	useEffect(() => {
		if (
			Object.keys(authUser).length &&
			(authUser?.isAdmin || authUser?.isSuperAdmin)
		) {
			navigate('/admin/dashboard');
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.email && user.password) {
			signInAdmin(user).then((res) => {
				if (res && res?.user) {
					login();
					navigate('/admin/dashboard');
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
					Login to FairSpace
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
				</div>
				{error.length ? (
					<p className='py-[20px] text-red-500'>{error}</p>
				) : null}
				<button
					type='submit'
					className='mx-auto block mt-[40px] text-[18px] font-medium bg-white rounded-[32px] w-[400px] text-center p-[20px]'>
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
