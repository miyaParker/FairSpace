import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import firebaseConfig from './firebaseConfig';

function initDB() {
	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	return db;
}
export default initDB;
