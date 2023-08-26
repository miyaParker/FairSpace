import DashboardLayout from '../layouts/DashboardLayout';
import {useState, useEffect, useContext} from 'react';
import IncidentReportForm from '../components/IncidentReportForm';
import {fetchIncidents} from '../services/dashboard';
import NavBar from '../components/NavBar';
import AuthContext from '../contexts/rename/AuthContext';
import {Incident} from '../components/IncidentReportForm';
import firebase from 'firebase/compat/app';
import DataSnapshot = firebase.database.DataSnapshot;
const Incidents = () => {
	const {user} = useContext(AuthContext);
	const monthArray = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const [showForm, setShowForm] = useState(false);
	const [incidents, setIncidents] = useState<Incident[]>([] as Incident[]);
	const handleClick = () => {
		setShowForm(true);
	};
	const fetchCallback = (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		const incidentsArr = Object.values(data) as Incident[];
		setIncidents(incidentsArr);
	};
	const createDateString = (date) => {
		const stringArray = date?.split('/');
		const day = stringArray[0];
		const month = monthArray[parseInt(stringArray[1]) - 1];
		const year = stringArray[2];
		return `${month} ${day}, ${year} `;
	};
	useEffect(() => {
		fetchIncidents(fetchCallback);
	}, []);

	return (
		<div className='relative'>
			<DashboardLayout>
				<div className='h-full w-full pr-[40px] flex flex-col'>
					<NavBar title='Incidents' />
					<div className='pt-[20px] flex justify-end pb-[30px]'>
						{!(user?.isAdmin || user?.isSuperAdmin) && (
							<div className='cursor-pointer rounded-[40px] bg-black flex gap-x-[10px] px-[20px] py-[15px]'>
								<img src='/plus.svg' width={16} height={16} />
								<button
									onClick={handleClick}
									className='text-white font-semibold text-[16px]'>
									Report Incident
								</button>
							</div>
						)}
					</div>
					<div className='max-h-[80%] h-max overflow-y-scroll w-full bg-white rounded-[18px] text-[17px] px-[40px]'>
						<div className='w-full flex py-[40px]'>
							<p className='w-1/5 text-gray'>Incident ID</p>
							<p className='w-1/5 text-gray'>Date</p>
							<p className='w-1/5 text-gray'>Type</p>
							<p className='w-1/5 text-gray'>Severity</p>
							<p className='w-1/5 text-gray'>Status</p>
						</div>
						{incidents.map((incident: Incident) => (
							<a
								key={incident?.id}
								href={
									user?.isAdmin || user?.isSuperAdmin
										? `/admin/incidents/${incident.id}`
										: `/app/incidents/${incident.id}`
								}>
								<div>
									<div className='w-full flex my-[20px]'>
										<p className='w-1/5  text-black'>
											#{incident?.id?.substring(3, 10).toUpperCase()}
										</p>
										<p className='w-1/5  text-black'>
											{createDateString(incident?.date)}
										</p>
										<p className='w-1/5 text-black'>{incident.incidentType}</p>
										<p className='w-1/5 text-black'>{incident.severity}</p>
										<p className='w-1/5 text-black flex gap-x-[10px] items-center'>
											{incident?.status === 'Pending' && (
												<span
													className={`inline-block rounded-[3px] w-3 h-3 bg-red-300`}></span>
											)}
											{incident.status === 'Assigned' && (
												<span
													className={`inline-block rounded-[3px] w-3 h-3 bg-purple-300`}></span>
											)}
											{incident.status === 'Under Review' && (
												<span
													className={`inline-block rounded-[3px] w-3 h-3 bg-blue-300`}></span>
											)}
											{incident.status === 'Resolved' && (
												<span
													className={`inline-block rounded-[3px] w-3 h-3 bg-green-300`}></span>
											)}
											<span>{incident.status}</span>
										</p>
									</div>
									<div className='h-[1px] bg-[#E7E9EF] my-[20px]'></div>
								</div>
							</a>
						))}
					</div>
				</div>
			</DashboardLayout>
			<IncidentReportForm show={showForm} setShow={() => setShowForm(false)} />
		</div>
	);
};
export default Incidents;
