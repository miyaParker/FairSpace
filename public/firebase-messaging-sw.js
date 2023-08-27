importScripts(
	'https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js'
);
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// import firebaseConfig from './src/services/firebaseConfig';
// import {initializeApp} from 'firebase/app';
// import {getMessaging} from 'firebase/messaging/sw';

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);
