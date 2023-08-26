import initDB from './initDB';
import {
	child,
	push,
	ref,
	set,
	onValue,
	update,
	query,
	orderByChild,
	equalTo,
} from 'firebase/database';

export const createIncident = (data) => {
	const db = initDB();

	const reportId = push(child(ref(db), 'incidents')).key;
	set(ref(db, 'incidents/' + reportId), {...data, id: reportId})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => console.error(err));
};

export const fetchIncidents = (onSuccess) => {
	const db = initDB();
	const incidentsRef = ref(db, 'incidents/');
	onValue(incidentsRef, onSuccess);
};
export const fetchAssignedCases = (email, onSuccess) => {
	const db = initDB();
	const incidentsRef = query(
		ref(db, 'incidents/'),
		orderByChild('investigator'),
		equalTo(email)
	);
	onValue(incidentsRef, onSuccess);
};

export const getIncidentById = (id, onSuccess) => {
	const db = initDB();
	const incidentsRef = ref(db, 'incidents/' + id);
	onValue(incidentsRef, onSuccess);
};

export const updateIncident = (id, body, onSuccess = null) => {
	const db = initDB();

	const incidentsRef = ref(db, 'incidents/' + id);
	onValue(incidentsRef, (snapshot) => {
		const data = snapshot.val();
		const postData = {
			...data,
			...body,
		};
		const updates = {};
		updates['/incidents/' + id] = postData;
		update(ref(db), updates)
			.then(() => typeof onSuccess === 'function' && onSuccess())
			.catch((err) => console.error(err));
	});
};
