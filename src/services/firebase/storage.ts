import {getStorage, ref, uploadBytes} from 'firebase/storage';

export const uploadFile = (file: File) => {
	const storage = getStorage();
	const storageRef = ref(storage, 'images/evidence.png');
	uploadBytes(storageRef, file).then((snapshot) => {
		console.log('Uploaded a blob or file!', snapshot);
	});
};
