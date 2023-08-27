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
	get,
	getDatabase,
} from 'firebase/database';
import {Incident} from '../components/IncidentReportForm';

export const createIncident = (data: Incident) => {
	const db = initDB();

	const reportId = push(child(ref(db), 'incidents')).key;
	set(ref(db, 'incidents/' + reportId), {...data, id: reportId})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => console.error(err));
};

export const fetchIncidents = (onSuccess: (snapshot: any) => unknown) => {
	const db = initDB();
	const incidentsRef = ref(db, 'incidents/');
	onValue(incidentsRef, onSuccess);
};
export const fetchAssignedCases = (
	email: string,
	onSuccess: (snapshot: any) => unknown
) => {
	const db = initDB();
	const incidentsRef = query(
		ref(db, 'incidents/'),
		orderByChild('investigator'),
		equalTo(email)
	);
	onValue(incidentsRef, onSuccess);
};

export const getIncidentById = (id, onSuccess: (snapshot: any) => unknown) => {
	const db = initDB();
	const incidentsRef = ref(db, 'incidents/' + id);
	onValue(incidentsRef, onSuccess);
};

export const updateIncident = (
	id,
	body,
	onSuccess: (snapshot: any) => unknown
) => {
	const db = initDB();
	const dbRef = ref(getDatabase());

	get(child(dbRef, `incidents/${id}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				const postData = {
					...data,
					...body,
				};
				const updates = {};
				updates['/incidents/' + id] = postData;
				update(ref(db), updates)
					.then(
						() =>
							typeof onSuccess === 'function' &&
							typeof onSuccess(snapshot) === 'function'
					)
					.catch((err) => console.error(err));
			} else {
				console.log('No data available');
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

export const fetchAdmins = (onSuccess: (snapshot) => void) => {
	const db = initDB();
	const adminRef = ref(db, 'admin/');
	onValue(adminRef, onSuccess);
};
