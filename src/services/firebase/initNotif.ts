import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import firebaseConfig from './firebaseConfig';
import initDB from './initDB';
import {child, push, ref, set} from 'firebase/database';

function requestPermission() {
	console.log('Requesting permission...');
	Notification.requestPermission().then((permission) => {
		if (permission === 'granted') {
			console.log('Notification permission granted.');
		}
	});
}

export function initNotif() {
	const userObj = localStorage.getItem('user');
	console.log(userObj);
	if (userObj) {
		const user = JSON.parse(userObj);
		const db = initDB();
		const app = initializeApp(firebaseConfig);
		const messaging = getMessaging(app);
		getToken(messaging, {
			vapidKey:
				'BMc13IOwt0ESFf77wpO-yvjipd5sJfgFr0I--_RivEfMqwtyI17zNDu2gp-yZOQbNsM3SfkEWCCthegZpLU2Hvo',
		}).then((token) => {
			console.log('INIT TOKEN', token);
			if (token) {
				set(ref(db, 'token/' + user.uid), {token})
					.then((data) => {
						console.log(data);
					})
					.catch((err) => console.error(err));
			} else {
				requestPermission();
			}
		});
		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			// ...
		});

		return messaging;
	}
}

// AIzaSyDv-CWf4QEZphbI3YGqxgMLcFUNOLwy1D/
