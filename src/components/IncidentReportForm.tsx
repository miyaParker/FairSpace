import {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {createIncident} from '../services/firebase/dashboard';
import {IFile, IIncident} from '../types';
import Loader from './Loader';
import firebase from 'firebase/compat/app';
import User = firebase.User;
import {
	documentTypes,
	imageTypes,
	requiredFields,
	videoTypes,
} from '../constants';
import {uploadFile} from '../services/firebase/storage';

const IncidentReportForm = ({show, setShow}: {show: boolean; setShow: any}) => {
	const initialData = {
		date: '',
		time: '',
		location: '',
		incidentType: '',
		status: 'Pending',
		reportedBy: '',
		severity: '',
		description: '',
		partiesInvolved: '',
		witnesses: '',
		emotionalImpact: '',
		desiredOutcome: '',
		confidentiality: '',
		contactInformation: '',
		comments: '',
		rating: 0,
		feedback: [],
		createdAt: '',
		investigator: '',
	};
	const [user, setUser] = useState({} as User);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(1);
	const [prevIndex, setPrevIndex] = useState(1);
	const [formData, setFormData] = useState<IIncident>(initialData);
	const [fileList, setFileList] = useState<any[]>([]);

	const dateRef = useRef<HTMLInputElement | null>(null);
	const timeRef = useRef<HTMLInputElement | null>(null);
	const attachmentRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const userObject = localStorage.getItem('user');
		if (userObject) setUser(JSON.parse(userObject));
	}, []);
	const [error, setError] = useState({key: 0, value: ''});
	const goNext = () => {
		setIndex(index + 1);
		setPrevIndex(index);
		setError({
			key: 0,
			value: '',
		});
	};
	const handleSubmit = async () => {
		setLoading(true);
		const fileUrls = [] as IFile[];
		for (const file of fileList) {
			await uploadFile(file).then((url) => {
				fileUrls.push({name: file.name, size: file.size, type: file.type, url});
			});
		}
		const data = {
			...formData,
			evidence: fileUrls,
			reportedBy: user.uid,
			createdAt: new Date().getTime(),
		};
		console.log(data);
		createIncident(data);
		setTimeout(() => {
			setShow(false);
			setLoading(false);
		}, 3000);
	};
	return (
		<>
			{show ? (
				<div className='bg-black text-white absolute w-screen h-screen bottom-0'>
					{loading ? <Loader /> : null}
					<div className='relative'>
						<button
							onClick={() => setShow(false)}
							className='absolute top-[40px] right-[40px]'>
							close
						</button>
						<form className='mx-auto h-screen relative flex items-center px-[20px] md:px-[40px] w-full max-w-[840px]'>
							{index === 1 ? (
								<motion.div
									initial={{
										x: prevIndex > 1 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}>
									<label className='text-[52px]'>
										1. When did the incident occur?*
									</label>
									<input
										ref={dateRef}
										value={formData.date}
										onChange={(e) => {
											setError({key: 0, value: ''});
											setFormData({
												...formData,
												date: '',
											});
											const today = new Date().getTime();
											const incidentDate = new Date(e.target.value).getTime();

											if (incidentDate <= today) {
												setFormData({
													...formData,
													date: e.target.value,
												});
											} else
												setError({
													key: 1,
													value:
														'Incident date cannot be in the future. Please choose a valid date.',
												});
										}}
										type='date'
										placeholder='mm/dd/yyyy'
										required={true}
										onClick={() => dateRef.current?.showPicker()}
										className='cursor-pointer w-full p-8 bg-black text-[22px] mt-4 block border-b border-b-1 border-white'
									/>
									{error.key == 1 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 2 ? (
								<motion.div
									initial={{
										x: prevIndex > 2 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										2. What time did the incident occur?
										<span className='inline-block ml-4 text-gray text-[26px]'>
											(24hr format)
										</span>
									</label>
									<input
										ref={timeRef}
										type='time'
										value={formData.time}
										onChange={(e) =>
											setFormData({
												...formData,
												time: e.target.value,
											})
										}
										onClick={() => timeRef.current?.showPicker()}
										placeholder='hh:mm'
										className='cursor-pointer w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
								</motion.div>
							) : null}
							{index === 3 ? (
								<motion.div
									initial={{
										x: prevIndex > 3 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										3. Where did the incident take place?*
									</label>
									<textarea
										required={true}
										value={formData.location}
										onChange={(e) =>
											setFormData({
												...formData,
												location: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
									{error.key == 3 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 4 ? (
								<motion.div
									initial={{
										x: prevIndex > 4 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										4. Can you provide a detailed description of the incident?*
									</label>
									<textarea
										required={true}
										value={formData.description}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
									{error.key == 4 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 5 ? (
								<motion.div
									initial={{
										x: prevIndex > 5 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										5. Who was involved in the incident?*
									</label>
									<textarea
										required={true}
										value={formData.partiesInvolved}
										onChange={(e) =>
											setFormData({
												...formData,
												partiesInvolved: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
									{error.key == 5 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 6 ? (
								<motion.div
									initial={{
										x: prevIndex > 6 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										6. What type of incident is this?*
									</label>
									<select
										required={true}
										value={formData.incidentType}
										onChange={(e) =>
											setFormData({
												...formData,
												incidentType: e.target.value,
											})
										}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white cursor-pointer'>
										<option>Incident Type</option>
										<option value='Discrimination'>Discrimination</option>
										<option value='Harassment'>Harassment</option>
										<option value='Bias'>Bias</option>
									</select>
									{error.key == 6 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 7 ? (
								<motion.div
									initial={{
										x: prevIndex > 7 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										7. Were there any witnesses to the incident?*
									</label>
									<textarea
										required={true}
										value={formData.witnesses}
										onChange={(e) =>
											setFormData({
												...formData,
												witnesses: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
									{error.key == 7 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 8 ? (
								<motion.div
									initial={{
										x: prevIndex > 8 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										8. How would you rate the severity of the incident?*
									</label>
									<select
										required={true}
										value={formData.severity}
										onChange={(e) =>
											setFormData({
												...formData,
												severity: e.target.value,
											})
										}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white cursor-pointer'>
										<option>Severity</option>
										<option value='Low'>Low</option>
										<option value='Medium'>Medium</option>
										<option value='High'>High</option>
									</select>
									{error.key == 8 ? (
										<p className='py-[20px] text-red-500'>{error.value}</p>
									) : null}
								</motion.div>
							) : null}
							{index === 9 ? (
								<motion.div
									initial={{
										x: prevIndex > 9 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px] mb-4 block leading-[120%]'>
										9.Do you have any evidence?
									</label>
									<input
										accept={[
											...imageTypes,
											...videoTypes,
											...documentTypes,
										].toString()}
										ref={attachmentRef}
										type='file'
										onChange={(e) =>
											setFileList([
												...Array.from(fileList),
												e?.currentTarget?.files && e.currentTarget?.files[0],
											])
										}
										className='hidden w-full p-8 bg-transparent text-[22px] mt-4 text-white block border border-white'
									/>
									{fileList?.length === 4 ? null : (
										<div
											onClick={() => attachmentRef.current?.click()}
											className='mb-4 cursor-pointer flex flex-col gap-[20px] border-dashed items-center justify-center p-6 w-full mx-auto bg-transparent text-[22px] text-white block border border-white'>
											<img src='/file.svg' width={24} height={24} />
											<p className='inline-block text-white/50 text-[18px]'>
												Attach if available (maximum of 4 files)
											</p>
										</div>
									)}
									{fileList?.length
										? Array.from(fileList).map((file, index) => (
												<div
													className='w-full flex justify-between gap-[10px] p-4 inline-block mb-2 text-[16px] bg-[#121212]'
													key={index}>
													<p className=' font-medium '>{file?.name}</p>
													<img
														onClick={() => {
															const newFileList = fileList.filter(
																(fileCurrent) =>
																	fileCurrent?.name !== file?.name
															);
															console.log(newFileList);
															setFileList(newFileList);
														}}
														src='/close-white.svg'
														width={24}
														height={24}
														className='cursor-pointer'
													/>
												</div>
										  ))
										: null}
								</motion.div>
							) : null}

							{index === 10 ? (
								<motion.div
									initial={{
										x: prevIndex > 9 ? -400 : 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										10. How has the incident affected you emotionally?
									</label>
									<textarea
										value={formData.emotionalImpact}
										onChange={(e) =>
											setFormData({
												...formData,
												emotionalImpact: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
								</motion.div>
							) : null}
							{index === 11 ? (
								<motion.div
									initial={{x: prevIndex > 10 ? -400 : 400}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										11. What would you like to see as an outcome of reporting
										this incident?
									</label>
									<textarea
										value={formData.desiredOutcome}
										onChange={(e) =>
											setFormData({
												...formData,
												desiredOutcome: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
								</motion.div>
							) : null}
							{index === 12 ? (
								<motion.div
									initial={{
										x: prevIndex > 11 ? -400 : 400,
										y: 0,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
										duration: 0.3,
									}}
									className=''>
									<motion.div
										animate={{
											y: formData.confidentiality === 'False' ? -40 : 0,
										}}
										transition={{
											duration: 0.3,
										}}>
										<label className='text-[52px]'>
											12. Would you like to report this incident anonymously?*
										</label>
										<select
											required={true}
											value={formData.confidentiality}
											onChange={(e) =>
												setFormData({
													...formData,
													confidentiality: e.target.value,
												})
											}
											className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white cursor-pointer'>
											<option>Confidentiality</option>
											<option value='Yes'>Yes</option>
											<option value='No'>No</option>
										</select>
										{error.key == 12 ? (
											<p className='py-[20px] text-red-500'>{error.value}</p>
										) : null}
									</motion.div>
									{formData.confidentiality === 'No' ? (
										<motion.div
											initial={{
												y: 40,
												opacity: 0,
											}}
											whileInView={{
												x: 0,
												y: 0,
												opacity: 1,
											}}
											transition={{
												type: 'tween',
											}}
											className='pt-[40px]'>
											<label className='text-[26px]'>Work Email*</label>
											<input
												value={formData.contactInformation}
												onChange={(e) =>
													setFormData({
														...formData,
														contactInformation: e.target.value,
													})
												}
												placeholder='amaka@company.com'
												required={true}
												className='w-full p-8 bg-transparent text-[20px] mt-4 text-white block border-b border-b-1 border-white'
												type='email'
											/>
										</motion.div>
									) : null}
								</motion.div>
							) : null}
							{index === 13 ? (
								<motion.div
									initial={{
										x: 400,
										opacity: 0,
									}}
									whileInView={{x: 0, opacity: 1}}
									transition={{
										stiffness: 80,
									}}
									className=''>
									<label className='text-[52px]'>
										13. Is there anything else you'd like to share about the
										incident?
									</label>
									<textarea
										value={formData.comments}
										onChange={(e) =>
											setFormData({
												...formData,
												comments: e.target.value,
											})
										}
										cols={100}
										className='w-full p-8 bg-transparent text-[22px] mt-4 text-white block border-b border-b-1 border-white'
									/>
								</motion.div>
							) : null}
							{index === 13 ? (
								<button
									type='submit'
									onClick={(e) => {
										e.preventDefault();
										handleSubmit().catch((err) => console.error(err));
									}}
									className='border border-black text-black bg-teal-400  text-[24px] border-2 py-[20px] px-[40px] rounded-[40px] absolute bottom-[120px] right-[20px] flex gap-[10px]'>
									Submit
								</button>
							) : null}
							{index <= 12 ? (
								<button
									type='button'
									onClick={() => {
										const required = Object.keys(requiredFields);
										if (required.includes(index.toString())) {
											if (
												formData[requiredFields[index] as keyof typeof formData]
											) {
												goNext();
											} else
												setError({
													key: index,
													value: 'This field is required',
												});
										} else goNext();
									}}
									className='border border-2 py-[20px] px-[40px] rounded-[40px] absolute bottom-[120px] right-[20px] flex gap-[10px]'>
									<span className='text-[24px]'>Next</span>
									<img
										src='/arrow-right.svg'
										width={32}
										height={32}
										alt='previous'
									/>
								</button>
							) : null}
							{index === 1 ? null : (
								<button
									type='button'
									onClick={() => {
										if (index >= 2) {
											setIndex(index - 1);
											setPrevIndex(index);
										}
									}}
									className='border border-2 py-[20px] px-[40px] rounded-[40px] absolute bottom-[120px] left-[20px] flex gap-[10px]'>
									<img
										className='rotate-[180deg]'
										src='/arrow-right.svg'
										width={32}
										height={32}
										alt='next'
									/>
									<span className='text-[24px]'>Prev</span>
								</button>
							)}
						</form>
					</div>
				</div>
			) : null}
		</>
	);
};
export default IncidentReportForm;
