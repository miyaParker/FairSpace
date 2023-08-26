import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {child, push, query, ref, set} from 'firebase/database';
import initDB from './initDB';

export function createAdmin({email, password}) {
	const db = initDB();
	const auth = getAuth();

	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const adminId = push(child(ref(db), 'admin')).key;
			set(ref(db, 'admin/' + adminId), {uid: user.uid, role: 'ADMIN'}).catch(
				(err) => console.error(err)
			);
			localStorage.setItem(
				'user',
				JSON.stringify({...user, role: 'ADMIN', isAdmin: true})
			);
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

export function signInAdmin({email, password}) {
	initDB();
	const auth = getAuth();
	const db = initDB();
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const adminRef = query(ref(db, 'admin/' + user.uid));
			if (adminRef) {
				localStorage.setItem(
					'user',
					JSON.stringify({...user, role: 'ADMIN', isAdmin: true})
				);
				return {user, error: null};
			}
			return {user: null, error: 'Not an admin'};
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

export function createUser({email, password}) {
	initDB();
	const auth = getAuth();
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem('user', JSON.stringify(user));
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

export function signIn({email, password}) {
	initDB();
	const auth = getAuth();
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem('user', JSON.stringify(user));
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
