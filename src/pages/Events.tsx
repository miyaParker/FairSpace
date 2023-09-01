import DashboardLayout from '../layouts/DashboardLayout';
import NavBar from '../components/NavBar';
import {colors} from '../constants';

const Events = () => {
	const events = [
		{
			title: 'Gender Equity in the Workplace; Enablers & Constraints',
			date: 'Sep 23, 2023',
			from: '9:00am',
			to: '5:00pm',
			description:
				'Policies that promote gender equity can help level the playing field for men and women and provide equal opportunities and equal outcomes for both gender.',
			location: 'Online',
			link: 'https://meet.google.com/nad-ayux-ern',
		},
	];
	return (
		<DashboardLayout>
			<div className='h-full w-full pr-[40px] flex flex-col'>
				<NavBar title='Upcoming Events' />
				<div className='overflow-y-scroll pt-[30px]'>
					<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
						{events?.length
							? events.map((event, index) => (
									<div
										key={index}
										className={`relative h-[540px] w-full flex flex-col gap-[20px] ${colors[index]} p-[20px] rounded-[18px]`}>
										<div className='flex flex-col text-[px]'>
											<h2 className='max-w-[400px] mb-4 font-medium text-[18px] leading-[120%] xl:text-[22px] '>
												{event.title}
											</h2>
											<p className='max-w-[480px] text-black/70 mb-6 text-[18px] leading-[120%] xl:text-[18px] '>
												{event.description}
											</p>
											<p className='text-black/70 font-medium text-[18px] leading-[120%] xl:text-[18px] '>
												Event Details
											</p>
											<p className='flex gap-x-[5px] my-3 items-center'>
												<div className='rounded-full w-[32px] h-[32px] border border-black/80 flex justify-center items-center'>
													<img src='/calendar.svg' width={14} height={14} />
												</div>
												<p className='max-w-[480px] text-black/70 text-[18px] leading-[120%] xl:text-[18px] '>
													{event.date}
												</p>
											</p>
											<div className='flex gap-x-[5px] mb-3 items-center'>
												<div className='rounded-full w-[32px] h-[32px] border border-black/70 flex justify-center items-center'>
													<img src='/clock.svg' width={20} height={20} />
												</div>
												<div>
													<span className='inline-block mx-[2px]'>
														{event.from}
													</span>
													<span>-</span>
													<span className='inline-block mx-[2px]'>
														{event.to}
													</span>
												</div>
											</div>
											<div className='flex gap-x-[5px] mb-3 items-center'>
												<div className='rounded-full w-[32px] h-[32px] border border-black/70 flex justify-center items-center'>
													<img src='/location.svg' width={20} height={20} />
												</div>
												<p className='max-w-[480px] text-black/70 text-[18px] leading-[120%] xl:text-[18px] '>
													{event.location}
												</p>
											</div>
											{event.location === 'Online' ? (
												<a href={event.link} target='_blank'>
													<button
														className={`text-[18px] text-black/80 font-semibold absolute bottom-[20px] event-calendar p-[20px] rounded-[10px] ${colors[
															index
														].slice(0, -3)} bg-opacity-80`}>
														Join Event
													</button>
												</a>
											) : // </div>
											null}
										</div>
									</div>
							  ))
							: null}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};
export default Events;
