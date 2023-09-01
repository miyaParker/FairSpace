import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {
	child,
	equalTo,
	onValue,
	orderByChild,
	push,
	query,
	ref,
	set,
} from 'firebase/database';
import initDB from './initDB';
import {initNotif} from './initNotif';

export function createAdmin({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const db = initDB();
	const auth = getAuth();

	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const adminId = push(child(ref(db), 'admin')).key;

			set(ref(db, 'admin/' + adminId), {
				uid: user.uid,
				role: 'ADMIN',
				isAdmin: true,
				email: user.email,
			}).catch((err) => console.error(err));
			localStorage.setItem(
				'user',
				JSON.stringify({...user, role: 'ADMIN', isAdmin: true})
			);
			initNotif();
			return {user, error: null};
		})
		.catch((error) => {
			const errorMessage = error.message;
			const userExists = errorMessage.includes('email-already-in-use');
			if (userExists) {
				return {user: null, error: 'User exists'};
			}
		});
}

export function signInAdmin(
	{
		email,
		password,
	}: {
		email: string;
		password: string;
	},
	cb?: (isSuperUser: boolean) => void
) {
	initDB();
	const auth = getAuth();
	const db = initDB();
	signInWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = userCredential.user;
			const adminRef = query(
				ref(db, 'admin/'),
				orderByChild('uid'),
				equalTo(user.uid)
			);
			onValue(
				adminRef,
				(snapshot) => {
					console.log(snapshot.val());
					const admin = Object.values(snapshot.val())[0] as {
						isAdmin: boolean;
						isSuperAdmin: boolean;
						role: string;
						uid: string;
					};
					localStorage.setItem(
						'user',
						JSON.stringify({
							...user,
							role: 'ADMIN',
							isAdmin: admin?.isAdmin,
							isSuperAdmin: admin?.isSuperAdmin,
						})
					);
					initNotif();
					if (typeof cb === 'function')
						if (admin?.isSuperAdmin || admin?.isAdmin) cb(true);
				},
				{onlyOnce: true}
			);
		})
		.catch((error) => {
			const errorMessage = error.message;
			const wrongCredentials = errorMessage.includes('wrong-password');
			const userNotFound = errorMessage.includes('user-not-found');
			if (wrongCredentials) {
				return {user: null, error: 'User not found'};
			}
			if (userNotFound) {
				return {user: null, error: 'Wrong credentials'};
			}
		});
}

export function createUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	initDB();
	const auth = getAuth();
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem('user', JSON.stringify(user));
			initNotif();
			return {user, error: null};
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			const userExists = errorMessage.includes('email-already-in-use');
			if (userExists) {
				return {user: null, error: 'User exists'};
			}
		});
}

export function signIn({email, password}: {email: string; password: string}) {
	initDB();
	const auth = getAuth();
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem('user', JSON.stringify(user));
			initNotif();
			return {user, error: null};
		})
		.catch((error) => {
			const errorMessage = error.message;
			const wrongCredentials = errorMessage.includes('wrong-password');
			const userNotFound = errorMessage.includes('user-not-found');
			if (wrongCredentials) {
				return {user: null, error: 'User not found'};
			}
			if (userNotFound) {
				return {user: null, error: 'Wrong credentials'};
			}
		});
}
