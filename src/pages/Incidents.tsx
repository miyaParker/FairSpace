import DashboardLayout from '../layouts/DashboardLayout';
import {useState, useEffect, useContext} from 'react';
import IncidentReportForm from '../components/IncidentReportForm';
import {fetchIncidents} from '../services/firebase/dashboard';
import NavBar from '../components/NavBar';
import AuthContext from '../contexts/AuthContext';
import firebase from 'firebase/compat/app';
import DataSnapshot = firebase.database.DataSnapshot;
import {Link} from 'react-router-dom';
import {IIncident} from '../types';
import {createDateString} from '../helper';
import DefaultLoader from '../components/DefaultLoader';

const Incidents = () => {
	const {user: authUser} = useContext(AuthContext);
	const user = JSON.parse(authUser);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [incidents, setIncidents] = useState<IIncident[]>([] as IIncident[]);
	const handleClick = () => {
		setShowForm(true);
	};
	const fetchCallback = (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		if (data) {
			const incidentsArr = Object.values(data) as IIncident[];
			setIncidents(incidentsArr);
			setLoading(false);
		} else setLoading(false);
	};
	useEffect(() => {
		setLoading(true);
		fetchIncidents(fetchCallback);
	}, []);

	return (
		<div className='relative'>
			<DashboardLayout>
				<div className='h-full w-full pr-[40px] flex flex-col'>
					<NavBar title='Incidents' />
					<div className='pt-[30px] flex justify-end pb-[30px]'>
						{!(user && (user?.isAdmin || user?.isSuperAdmin)) && (
							<div className='cursor-pointer rounded-[40px] bg-black flex gap-x-[10px] px-[20px] py-[15px]'>
								<img
									src='/plus.svg'
									width={16}
									height={16}
									alt='report incident'
								/>
								<button
									onClick={handleClick}
									className='text-white font-semibold text-[16px]'>
									Report Incident
								</button>
							</div>
						)}
					</div>
					{loading ? (
						<div className='w-full flex justify-center items-center h-screen'>
							<DefaultLoader />
						</div>
					) : incidents?.length ? (
						<div className='max-h-[80%] h-max overflow-y-scroll w-full bg-white rounded-[18px] text-[17px] px-[40px]'>
							<div className='w-full flex py-[40px]'>
								<p className='w-1/5 text-gray'>Incident ID</p>
								<p className='w-1/5 text-gray'>Date Reported</p>
								<p className='w-1/5 text-gray'>Type</p>
								<p className='w-1/5 text-gray'>Severity</p>
								<p className='w-1/5 text-gray'>Status</p>
							</div>
							{incidents
								.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
								.map((incident) => (
									<Link
										key={incident?.id}
										to={
											user?.isAdmin || user?.isSuperAdmin
												? `/admin/incidents/${incident.id}`
												: `/app/incidents/${incident.id}`
										}>
										<div>
											<div className='w-full flex my-[20px]'>
												<p className='w-1/5  text-black'>
													#{incident?.id?.substring(3, 10).toUpperCase()}
												</p>
												<p className='w-1/5 text-black'>
													{createDateString(incident?.createdAt)}
												</p>
												<p className='w-1/5 text-black'>
													{incident.incidentType}
												</p>
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
									</Link>
								))}
						</div>
					) : (
						<p className='text-black/70 text-[20px]'>
							Reported incidents will appear here.
						</p>
					)}
				</div>
			</DashboardLayout>
			<IncidentReportForm show={showForm} setShow={() => setShowForm(false)} />
		</div>
	);
};
export default Incidents;
