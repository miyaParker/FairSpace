import DashboardLayout from '../layouts/DashboardLayout';
import {useState, useEffect, useContext} from 'react';
import {
	getIncidentById,
	updateIncident,
	fetchAdmins,
} from '../services/firebase/dashboard';
import NavBar from '../components/NavBar';
import AuthContext from '../contexts/AuthContext';
import {useParams} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {Incident} from '../components/IncidentReportForm';
import firebase from 'firebase/compat/app';
import DataSnapshot = firebase.database.DataSnapshot;

const Incidents = () => {
	const {incidentId} = useParams();
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
	const [rating, setRating] = useState(0);
	const [showDropdown, setShowDropdown] = useState(false);
	const [incident, setIncident] = useState({} as Incident);
	const [response, setResponse] = useState('');
	const [error, setError] = useState('');
	const [formError, setFormError] = useState('');
	const [admins, setAdmins] = useState<any>([]);
	console.log(user);
	const assignCase = (body) => {
		if (body.investigator === 'Assign to Me') body['investigator'] = user.email;
		updateIncident(incident.id, body, (snapshot: DataSnapshot) => {
			console.log(snapshot.val());
		});
	};
	const resolveCase = (body) => {
		if (incident?.feedback && incident.feedback.length) {
			updateIncident(incident.id, body, () => {
				console.log('');
				// getIncidentById(incidentId, fetchCallback);
			});
		} else {
			setError('Include a feedback to resolve this case:');
		}
	};
	const sendFeedback = () => {
		setResponse('');
		const feedback = {
			date: new Date().getTime(),
			response,
			from:
				user?.isAdmin || user?.isSuperAdmin
					? user.email
					: user?.contactInformation
					? user?.contactInformation
					: 'anonymous@fairspace.com',
		};
		const prevFeedback = incident?.feedback ? incident.feedback : [];
		const body = {
			...incident,
			feedback: [...prevFeedback, feedback],
			status: 'Under Review',
		};
		updateIncident(incident.id, body, () => {
			console.log('updated');
		});
	};
	const fetchCallback = (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		setIncident(data);
	};
	const fetchAdminsCallback = (snapshot: DataSnapshot) => {
		const data = Object.values(snapshot.val());
		setAdmins(data);
	};
	const createDateString = (date) => {
		if (date) {
			const stringArray = date?.split('/');
			const day = stringArray[0];
			const month = monthArray[parseInt(stringArray[1]) - 1];
			const year = stringArray[2];
			return `${month} ${day}, ${year} `;
		}
	};
	useEffect(() => {
		getIncidentById(incidentId, fetchCallback);
		fetchAdmins(fetchAdminsCallback);
	}, []);
	useEffect(() => {
		const body = {
			rating,
		};
		updateIncident(incident.id, body, () => {
			console.log('updated');
		});
	}, [rating]);
	return (
		<div className='relative'>
			<DashboardLayout>
				<div className='h-full w-full pr-[40px] flex flex-col'>
					<NavBar
						title={`Incident Report #${incidentId
							?.substring(4, 10)
							.toUpperCase()}`}
					/>
					{Object.keys(incident).length ? (
						<div className=' overflow-y-scroll w-full text-[17px] mb-[90px]'>
							<div className='flex justify-between items-start'>
								<div className='flex my-[40px] gap-[20px]'>
									<div className='flex flex-col gap-[5px]'>
										<p className='font-medium text-[20px] max-w-[800px] text-black'>
											{createDateString(incident?.date)}
										</p>
										<p className='text-[17px] max-w-[800px] text-gray/90'>
											Date
										</p>
									</div>
									<div className='w-[1px] h-[60px] bg-black bg-opacity-40'></div>
									{incident?.incidentType && (
										<div className='flex flex-col gap-[5px]'>
											<p className='font-medium text-[20px] max-w-[800px] text-black'>
												{incident.incidentType}
											</p>
											<p className='text-[17px] max-w-[800px] text-gray/90'>
												Incident Type
											</p>
										</div>
									)}
									<div className='w-[1px] h-[60px] bg-black bg-opacity-40'></div>
									{incident?.severity && (
										<div className='flex flex-col gap-[5px]'>
											<p className='font-medium text-[20px] max-w-[800px] text-black'>
												{incident.severity}
											</p>
											<p className='text-[17px] max-w-[800px] text-gray/90'>
												Severity
											</p>
										</div>
									)}
									<div className='w-[1px] h-[60px] bg-black bg-opacity-40'></div>
									{incident?.status && (
										<div className='flex flex-col gap-[5px]'>
											<p className='font-medium text-[20px] max-w-[800px] text-black'>
												{incident.status}
											</p>
											<p className='text-[17px] max-w-[800px] text-gray/90'>
												Status
											</p>
										</div>
									)}
								</div>
								{user?.isAdmin || user?.isSuperAdmin ? (
									<>
										{console.log(incident.status, user?.isSuperAdmin)}
										{incident.status === 'Pending' && user?.isSuperAdmin && (
											<div
												onClick={() => setShowDropdown(!showDropdown)}
												className='relative pt-[20px] flex justify-end pb-[30px]'>
												<div className='cursor-pointer rounded-[40px] gap-[10px] bg-black flex items-center justify-center px-[20px] py-[15px]'>
													<button className='text-white font-semibold text-[16px]'>
														Assign Case
													</button>
													<img
														src='/arrow-down-white.svg'
														width={24}
														height={24}
													/>
												</div>
												<AnimatePresence>
													{showDropdown ? (
														<motion.div
															initial={{opacity: 0, y: 10}}
															whileInView={{opacity: 1, y: 0}}
															exit={{opacity: 0, y: 20}}
															className='border border-1 bg-white rounded-[14px] absolute top-[90px] right-[0px] w-[300px] p-[20px]'>
															<div className='pb-[6px]'>
																<p
																	onClick={(e) =>
																		assignCase({
																			investigator: e.currentTarget.textContent,
																			status: 'Assigned',
																		})
																	}
																	role='button'
																	className='text-[16px]'>
																	Assign to Me
																</p>
																<p
																	className='text-[14px] text-gray/90'
																	role='button'>
																	{user.email}
																</p>
															</div>
															{admins?.length &&
																admins.map((admin) => {
																	if (admin.email !== user.email) {
																		return (
																			<p
																				onClick={(e) =>
																					assignCase({
																						investigator:
																							e.currentTarget.textContent,
																						status: 'Assigned',
																					})
																				}
																				role='button'
																				className='text-[15px] py-[6px]'>
																				{admin.email}
																			</p>
																		);
																	}
																})}
														</motion.div>
													) : null}
												</AnimatePresence>
											</div>
										)}
										{(incident.status === 'Assigned' ||
											incident.status === 'Under Review') &&
											incident.investigator === user.email && (
												<div className='relative'>
													<div className='pt-[20px] flex justify-end pb-[30px]'>
														<div className='cursor-pointer rounded-[40px] gap-[10px] bg-black flex items-center justify-center px-[20px] py-[15px]'>
															<button
																onClick={() => {
																	setError('');
																	resolveCase({
																		status: 'Resolved',
																	});
																}}
																className='text-white font-semibold text-[18px]'>
																Mark as Resolved
															</button>
															<img src='/check.svg' width={24} height={24} />
														</div>
													</div>
													<AnimatePresence>
														{error && (
															<motion.form
																initial={{opacity: 0, y: 10}}
																whileInView={{opacity: 1, y: 0}}
																exit={{opacity: 0, y: 20}}
																className='right-0 w-[300px] absolute pt-[30px] pb-[24px] px-[24px] bg-white drop-shadow-2xl rounded-[20px] text-[18px] cursor-pointer'>
																<div className='relative'>
																	<div className='w-[32px] h-[32px] rounded-full bg-gray/20 absolute right-0 -top-[10px] flex items-center justify-center'>
																		<img
																			src='/close.svg'
																			width={24}
																			height={24}
																			onClick={() => setError('')}
																			className=''
																		/>
																	</div>

																	<label className='text-[18px] font-semibold block mb-[15px]'>
																		{error}
																	</label>
																	<textarea
																		required={true}
																		value={response}
																		onChange={(e) =>
																			setResponse(e.target.value)
																		}
																		rows={3}
																		className='w-full rounded-[10px] p-2 bg-white text-[18px] text-black block border border-black'
																	/>
																	<p className='text-red-500 py-[10px]'>
																		{formError}
																	</p>
																	<button
																		onClick={() => {
																			if (response.length) {
																				setError('');
																				const feedback = [
																					{
																						date: new Date().getTime(),
																						response,
																						from: user.email,
																					},
																				];
																				updateIncident(
																					incident.id,
																					{feedback, status: 'Resolved'},
																					() => {
																						getIncidentById(
																							incidentId,
																							fetchCallback
																						);
																					}
																				);
																			} else setFormError('Required field');
																		}}
																		className='mt-[15px] block mx-auto cursor-pointer rounded-[40px] bg-black text-white font-semibold text-[18px] px-[20px] py-[15px]'>
																		Resolve Case
																	</button>
																</div>
															</motion.form>
														)}
													</AnimatePresence>
												</div>
											)}
									</>
								) : null}
							</div>
							{incident?.location && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Location
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.location}
									</p>
								</div>
							)}
							{incident?.description && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Description
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.description}
									</p>
								</div>
							)}
							{incident?.partiesInvolved && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Parties Involved
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.partiesInvolved}
									</p>
								</div>
							)}

							{incident?.witnesses && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Witnesses
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.witnesses}
									</p>
								</div>
							)}

							{incident?.emotionalImpact && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Emotional Impact
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.emotionalImpact}
									</p>
								</div>
							)}
							{incident?.desiredOutcome && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Desired Outcome
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.desiredOutcome}
									</p>
								</div>
							)}
							{incident?.comments && (
								<div className='mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[10px]'>
										Comments
									</p>
									<p className='text-[20px] max-w-[800px]'>
										{incident.comments}
									</p>
								</div>
							)}
							{incident.status !== 'Pending' &&
							incident?.feedback &&
							incident?.feedback?.length ? (
								<div className='relative max-w-[800px] mb-[40px]'>
									<p className='text-[24px] font-semibold mb-[20px]'>
										Feedback Thread
									</p>
									<div className='mb-[20px] border-l border-l-4 px-8'>
										{incident.feedback
											.sort((a, b) => parseInt(a.date) - parseInt(b.date))
											.map((feedbackItem, index) => {
												const dateArr = new Date(feedbackItem.date)
													.toDateString()
													.split(' ');
												return (
													<div key={index}>
														<div className='relative items-start mb-[30px] flex gap-[10px]'>
															<img src='/profile.svg' width={24} height={24} />
															<div>
																<p className='text-[15px] text-gray/90 mb-[12px] leading-[100%]'>
																	{feedbackItem.from}
																</p>
																<p className='text-[20px] p-0'>
																	{feedbackItem.response}
																</p>
															</div>
															<p className='absolute leading-[100%] right-0 flex-shrink-0 text-[15px] text-gray/90'>
																{`${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`}
															</p>
														</div>
														{incident?.feedback &&
															index < incident?.feedback.length - 1 && (
																<div className='w-full h-[1px] bg-gray/20 my-[20px]'></div>
															)}
													</div>
												);
											})}
									</div>
								</div>
							) : null}
							{console.log(incident.reportedBy)}
							{incident.status !== 'Resolved' &&
							(incident?.investigator === user.email ||
								(user.uid === incident.reportedBy &&
									incident?.feedback &&
									incident?.feedback?.length)) ? (
								<div className='relative max-w-[800px]'>
									<label className='text-[24px] font-semibold mb-[10px]'>
										{user?.isAdmin || user?.isSuperAdmin
											? 'Admin Feedback:'
											: 'User Response:'}
									</label>
									<textarea
										required={true}
										value={response}
										onChange={(e) => setResponse(e.target.value)}
										rows={5}
										className='mb-[20px] w-full rounded-[28px] p-8 bg-white text-[22px] mt-4 text-black block border border-black'
									/>
									<div className='absolute right-0 w-max cursor-pointer gap-[10px] rounded-[40px] bg-black flex justify-center px-[20px] py-[15px]'>
										<button
											onClick={() => {
												if (response) {
													sendFeedback();
												}
											}}
											className='text-white font-semibold text-[16px]'>
											Send Response
										</button>
										<img
											src='/send.svg'
											width={24}
											height={24}
											className='rotate-[45deg]'
										/>
									</div>
								</div>
							) : null}
							{incident?.rating &&
							incident.status === 'Resolved' &&
							incident.rating > 0 ? (
								<div className='mb-[20px]'>
									<p className='text-[24px] font-semibold mb-[10px] '>
										Feedback Rating
									</p>
									<div className='flex gap-x-2'>
										<div className='flex gap-x-2'>
											{incident?.rating &&
												Array.from(Array(incident?.rating).keys()).map(() => (
													<img
														src={
															incident?.rating && incident?.rating > 3
																? '/star-green.svg'
																: '/star-orange.svg'
														}
														width={24}
														height={24}
													/>
												))}
											{Array.from(Array(5 - incident?.rating).keys()).map(
												() => (
													<img src='/star-gray.svg' width={24} height={24} />
												)
											)}
										</div>
									</div>
								</div>
							) : null}
							{incident.status === 'Resolved'
								? incident.rating === 0 &&
								  user.uid !== incident.reportedBy && (
										<div className='mb-[20px] flex gap-[20px]'>
											<p className='text-[28px] font-semibold mb-[10px] '>
												Feedback Rating
											</p>
											<div className='flex gap-x-2'>
												{Array.from(Array(5).keys()).map(() => (
													<img src='/star-gray.svg' width={24} height={24} />
												))}
											</div>
										</div>
								  )
								: null}
							{incident.status === 'Resolved' &&
							incident.rating === 0 &&
							user.uid === incident.reportedBy ? (
								<div className='flex flex-col items-center justify-center gap-[20px] my-[60px] '>
									<p className='text-[28px] font-semibold'>
										Rate Your Experience
									</p>
									<div className='flex gap-x-2 '>
										<div className='rate'>
											<input
												onChange={(e) => setRating(parseInt(e.target.value))}
												type='radio'
												id='star5'
												name='rate'
												value='5'
											/>
											<label
												htmlFor='star5'
												title='text'
												className='mr-1 inline-block'>
												5 stars
											</label>
											<input
												onChange={(e) => setRating(parseInt(e.target.value))}
												type='radio'
												id='star4'
												name='rate'
												value='4'
											/>
											<label
												htmlFor='star4'
												title='text'
												className='mr-1 inline-block'>
												4 stars
											</label>
											<input
												onChange={(e) => setRating(parseInt(e.target.value))}
												type='radio'
												id='star3'
												name='rate'
												value='3'
											/>
											<label
												htmlFor='star3'
												title='text'
												className='mr-1 inline-block'>
												3 stars
											</label>
											<input
												onChange={(e) => setRating(parseInt(e.target.value))}
												type='radio'
												id='star2'
												name='rate'
												value='2'
											/>
											<label
												htmlFor='star2'
												title='text'
												className='mr-1 inline-block'>
												2 stars
											</label>
											<input
												onChange={(e) => setRating(parseInt(e.target.value))}
												type='radio'
												id='star1'
												name='rate'
												value='1'
											/>
											<label
												htmlFor='star1'
												title='text'
												className='mr-1 inline-block'>
												1 star
											</label>
										</div>
									</div>
								</div>
							) : null}
						</div>
					) : null}
				</div>
			</DashboardLayout>
		</div>
	);
};
export default Incidents;
