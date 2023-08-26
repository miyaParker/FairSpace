import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

function initDB() {
	const firebaseConfig = {
		apiKey: 'AIzaSyDv-CWf4QEZphbI3YGqxgMLcFUNOLwy1DE',
		authDomain: 'fairspace-b3687.firebaseapp.com',
		databaseURL: 'https://fairspace-b3687-default-rtdb.firebaseio.com',
		projectId: 'fairspace-b3687',
		storageBucket: 'fairspace-b3687.appspot.com',
		messagingSenderId: '521083593961',
		appId: '1:521083593961:web:2ecf77a0ead7620004bc78',
		measurementId: 'G-QF77DNGJM2',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Realtime Database and get a reference to the service
	const db = getDatabase(app);
	return db;
}
export default initDB;
