import DashboardLayout from '../../layouts/DashboardLayout';
import {useContext, useEffect, useState} from 'react';
import IncidentReportForm from '../../components/IncidentReportForm';
import NavBar from '../../components/NavBar';
import firebase from 'firebase/compat/app';
import {createDateString} from '../../helper';
import {PieChart, ResponsiveContainer, Pie, Cell, Legend} from 'recharts';
import {
	fetchIncidents,
	fetchAssignedCases,
} from '../../services/firebase/dashboard';
import UserContext from '../../contexts/AuthContext';
import DataSnapshot = firebase.database.DataSnapshot;
import {IIncident} from '../../types';

interface IPie {
	name: string;
	value: number;
}

const Incidents = () => {
	const {user} = useContext(UserContext);
	const [data, setData] = useState<IPie[]>([] as IPie[]);
	const colors = ['#0B1D51', '#3498db', '#2ecc71'];
	const [incidents, setIncidents] = useState<IIncident[]>([] as IIncident[]);
	const [pendingIncidents, setPendingIncidents] = useState<IIncident[]>(
		[] as IIncident[]
	);
	const [resolvedIncidents, setResolvedIncidents] = useState<IIncident[]>(
		[] as IIncident[]
	);
	const [rating, setRating] = useState(0);
	const fetchCallback = (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		if (data) {
			const incidentsArr = Object.values(data) as IIncident[];
			setIncidents(incidentsArr);
			const pending = incidentsArr.filter(
				(incident) => incident.status === 'Pending'
			);
			const resolved = incidentsArr.filter(
				(incident) => incident.status === 'Resolved'
			);
			const ratedIncidents = incidentsArr.filter(
				(incident) => incident?.rating && incident?.rating > 0
			);
			const ratings = ratedIncidents.reduce((a, b) => {
				return a + b.rating!;
			}, 0);
			setPendingIncidents(pending);
			setResolvedIncidents(resolved);
			if (ratings > 0) setRating(ratings / ratedIncidents.length);
		}
	};
	useEffect(() => {
		if (user?.isAdmin) {
			fetchAssignedCases(user.email, fetchCallback, () => {});
		} else fetchIncidents(fetchCallback);
	}, []);
	useEffect(() => {
		if (incidents?.length) {
			const discrimination = incidents.filter(
				(incident) => incident.incidentType === 'Discrimination'
			);
			const bias = incidents.filter(
				(incident) => incident.incidentType === 'Bias'
			);
			const harassment = incidents.filter(
				(incident) => incident.incidentType === 'Harassment'
			);
			const graphData = [
				{
					name: 'Discrimination',
					value: discrimination.length,
				},
				{
					name: 'Harassment',
					value: harassment.length,
				},
				{
					name: 'Bias',
					value: bias.length,
				},
			];

			setData(graphData);
			console.log(graphData);
		}
	}, [incidents]);

	const [showForm, setShowForm] = useState(false);

	return (
		<div className='relative'>
			<DashboardLayout>
				<div className=' h-full w-full pr-[80px] flex flex-col'>
					<NavBar title='Dashboard' />
					<div className='pt-[40px] flex gap-[20px] pr-[20px]'>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-white bg-opacity-70 rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{pendingIncidents.length ? pendingIncidents.length : 'No data'}
							</p>
							<p className='text-center text-[20px] font-semibold'>
								{user?.isAdmin
									? 'Pending Incidents'
									: 'Total Pending Incidents'}
							</p>
						</div>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-white bg-opacity-70  rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{resolvedIncidents.length
									? resolvedIncidents.length
									: 'No data'}
							</p>
							<p className='text-center text-[20px] font-semibold'>
								{user?.isAdmin
									? 'Resolved Incidents'
									: 'Total Resolved Incidents'}
							</p>
						</div>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-white bg-opacity-70  rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{rating ? rating : 'No data'}
							</p>
							<p className='text-center text-[20px] font-semibold'>
								Average Rating
							</p>
						</div>
					</div>
					<div className='flex gap-[20px] mt-[20px] h-[50%]'>
						<div className='drop-shadow-xl w-2/3 flex-shrink-0 p-[30px] bg-white bg-opacity-70  rounded-[20px] overflow-hidden'>
							<p className='mb-[30px] text-[20px] font-semibold'>
								Recent Incidents
							</p>
							<div className='h-max overflow-scroll'>
								{incidents?.length ? (
									incidents.slice(0, 5).map((incident) => (
										<div key={incident.id}>
											<div className='w-full gap-[20px] flex my-[20px]'>
												<p className='w-1/4 min-w-max  text-black'>
													{createDateString(incident.createdAt)}
												</p>
												<p className='w-1/4 text-black'>
													{incident.incidentType}
												</p>
												<p className='w-1/4 text-black'>{incident.severity}</p>
												<p className='w-1/4 text-black flex gap-x-[10px] items-center'>
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
									))
								) : (
									<p className='text-center text-[42px] leading-[120%] font-bold'>
										No data
									</p>
								)}
							</div>
						</div>
						<div className='drop-shadow-xl w-1/3 flex flex-col flex-shrink-0 bg-white bg-opacity-70 p-[30px] rounded-[20px]'>
							<p className='mb-[10px] text-[20px] font-semibold'>
								Incident Type Distribution
							</p>
							{data?.length ? (
								<ResponsiveContainer width='100%' height='90%'>
									<PieChart>
										<Pie
											data={data}
											dataKey='value'
											nameKey='name'
											cx='50%'
											cy='50%'
											outerRadius={130}
											fill='#8884d8'>
											{data.map((_, index) => (
												<Cell key={`cell-${index}`} fill={colors[index]} />
											))}
										</Pie>
										<Legend
											verticalAlign='bottom'
											iconType='circle'
											layout='horizontal'
											iconSize={8}
											align='center'
										/>
									</PieChart>
								</ResponsiveContainer>
							) : (
								<p className='text-center text-[42px] leading-[120%] font-bold'>
									No data
								</p>
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
			<IncidentReportForm show={showForm} setShow={() => setShowForm(false)} />
		</div>
	);
};
export default Incidents;
