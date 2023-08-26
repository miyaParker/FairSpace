import DashboardLayout from '../../layouts/DashboardLayout';
import {useContext, useEffect, useState} from 'react';
import IncidentReportForm from '../../components/IncidentReportForm';
import NavBar from '../../components/NavBar';
import firebase from 'firebase/compat/app';
import {Incident} from '../../components/IncidentReportForm';
import {
	LineChart,
	Line,
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';
import {fetchIncidents, fetchAssignedCases} from '../../services/dashboard';
import UserContext from '../../contexts/rename/AuthContext';
import DataSnapshot = firebase.database.DataSnapshot;

const Incidents = () => {
	const {user} = useContext(UserContext);
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
	const [incidents, setIncidents] = useState<Incident[]>([] as Incident[]);
	const [pendingIncidents, setPendingIncidents] = useState<Incident[]>(
		[] as Incident[]
	);
	const [resolvedIncidents, setResolvedIncidents] = useState<Incident[]>(
		[] as Incident[]
	);
	const [rating, setRating] = useState(0);
	const fetchCallback = (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		console.log(data);
		if (data) {
			const incidentsArr = Object.values(data) as Incident[];
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
			setRating(ratings / ratedIncidents.length);
		}
	};
	const createDateString = (date) => {
		const stringArray = date?.split('/');
		const day = stringArray[0];
		const month = monthArray[parseInt(stringArray[1]) - 1];
		const year = stringArray[2];
		return `${month} ${day}, ${year} `;
	};
	useEffect(() => {
		if (user.isAdmin) {
			fetchAssignedCases(user.email, fetchCallback);
		} else fetchIncidents(fetchCallback);
	}, []);
	const data = [
		{
			name: 'Jan',
			uv: 400,
			pv: 2400,
			amt: 2400,
		},
		{name: 'Feb', uv: 200, pv: 2400, amt: 2400},
		{name: 'Mar', uv: 300, pv: 2400, amt: 2400},
		{
			name: 'Apr',
			uv: 200,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'May',
			uv: 300,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Jun',
			uv: 600,
			pv: 2400,
			amt: 2400,
		},
		{name: 'Jul', uv: 200, pv: 2400, amt: 2400},
		{name: 'Aug', uv: 300, pv: 2400, amt: 2400},
		{
			name: 'Sep',
			uv: 200,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Oct',
			uv: 300,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Nov',
			uv: 600,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Dec',
			uv: 550,
			pv: 2400,
			amt: 2400,
		},
	];
	const [showForm, setShowForm] = useState(false);

	return (
		<div className='relative'>
			<DashboardLayout>
				<div className=' h-full w-full pr-[80px] flex flex-col'>
					<NavBar title='Dashboard' />
					<div className='pt-[40px] flex gap-[20px] pr-[20px]'>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-[#C2BBF0] bg-opacity-40 rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{pendingIncidents.length ? pendingIncidents.length : 'No data'}
							</p>
							<p className='text-center text-[18px] font-semibold'>
								{user?.isAdmin
									? 'Pending Incidents'
									: 'Total Incidents Reported'}
							</p>
						</div>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-[#8FB8ED] bg-opacity-30 rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{resolvedIncidents.length}
							</p>
							<p className='text-center text-[20px] font-semibold'>
								Resolved Incidents
							</p>
						</div>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 py-[40px] bg-[#87DDE8] bg-opacity-40 rounded-[20px]'>
							<p className='text-center text-[42px] leading-[120%] font-bold'>
								{rating}
							</p>
							<p className='text-center text-[20px] font-semibold'>
								Response Rating
							</p>
						</div>
					</div>
					<div className='flex gap-[20px] mt-[20px] h-[50%]'>
						<div className='drop-shadow-xl w-2/3 flex flex-col items-start justify-center flex-shrink-0 py-[40px] bg-[#FCFCFC] p-[80px] rounded-[20px]'>
							<p className='mb-[30px] text-[20px] font-semibold'>
								Incident Frequency
							</p>
							<ResponsiveContainer width='100%' height='80%'>
								<LineChart data={data}>
									<Line
										dot={false}
										type='monotone'
										dataKey='uv'
										stroke='#7C5BD7'
										strokeWidth={3}
									/>
									<XAxis tickLine={false} axisLine={false} dataKey='name' />
									<YAxis tickLine={false} axisLine={false} />
									<CartesianGrid
										y={10}
										horizontal={true}
										vertical={false}
										fillOpacity={0.3}
										strokeDasharray='1 1'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div className='drop-shadow-xl w-1/3 flex-shrink-0 p-[40px] bg-[#FCFCFC] rounded-[20px] overflow-hidden'>
							<p className='mb-[30px] text-[20px] font-semibold'>
								Recent Incidents
							</p>
							<div className='h-max overflow-scroll'>
								{incidents.map((incident) => (
									<div key={incident.id}>
										<div className='w-full gap-[20px] flex my-[20px]'>
											<p className='w-1/3 min-w-max  text-black'>
												{createDateString(incident.date)}
											</p>
											<p className='w-1/3 text-black'>
												{incident.incidentType}
											</p>
											<p className='w-1/3 text-black'>{incident.severity}</p>
										</div>
										<div className='h-[1px] bg-[#E7E9EF] my-[20px]'></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
			<IncidentReportForm show={showForm} setShow={() => setShowForm(false)} />
		</div>
	);
};
export default Incidents;
