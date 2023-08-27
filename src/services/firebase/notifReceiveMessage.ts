import {initializeApp} from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import {getMessaging, onMessage} from 'firebase/messaging';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
	console.log('Message received. ', payload);
	// ...
});
