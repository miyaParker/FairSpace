import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export const uploadFile = (file: File) => {
	const storage = getStorage();
	const storageRef = ref(storage, `files/${file.name}.${file.type}`);
	return uploadBytes(storageRef, file).then((snapshot) =>
		getDownloadURL(snapshot.ref).then((url) => url)
	);
};
