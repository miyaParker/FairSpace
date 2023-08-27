import DashboardLayout from '../layouts/DashboardLayout';
import NavBar from '../components/NavBar';
import {useEffect, useState} from 'react';
import {fetchCourses} from '../services/udemy';

const LearningHub = () => {
	const [courses, setCourses] = useState<any>([]);
	useEffect(() => {
		fetchCourses().catch((err) => console.error(err));
	}, []);

	return (
		<DashboardLayout>
			<div className='h-full w-full pr-[40px] flex flex-col'>
				<NavBar title='Learning Hub' />
				<div className='flex flex-col mb-[30px] pt-[40px]'>
					<p className='text-[20px] max-w-[640px]'>
						Discover courses for insights and skills in fostering respect and
						inclusivity.
					</p>
				</div>
				<div className='h-max w-full flex gap-[20px] items-end overflow-hidden '>
					<div className='w-full flex gap-[20px] flex-wrap'>
						<div className='w-max flex-shrink-0 items-center h-max flex relative bg-white card bg-white rounded-[18px] p-[20px] text-[17px]'>
							<div className='w-[180px] h-full overflow-hidden rounded-[9px]'>
								<img
									src='/lesson1.webp'
									height={200}
									width={300}
									className='cover rounded-[9px]'
								/>
							</div>
							<div className='px-[20px] flex flex-col'>
								<h2 className='max-w-[220px] font-medium text-[18px] leading-[120%] xl:text-[20px] '>
									Preventing Harassment in the Workplace
								</h2>
								<p className='text-gray'>Coursera</p>
							</div>
						</div>
						<div className='w-max flex-shrink-0 items-center h-max flex relative bg-white card bg-white rounded-[18px] p-[20px] text-[17px]'>
							<div className='w-[180px] h-full overflow-hidden rounded-[9px]'>
								<img
									src='/lesson1.webp'
									height={200}
									width={300}
									className='cover rounded-[9px]'
								/>
							</div>
							<div className='px-[20px] flex flex-col'>
								<h2 className='max-w-[220px] font-medium text-[18px] leading-[120%] xl:text-[20px] '>
									Preventing Harassment in the Workplace
								</h2>
								<p className='text-gray'>Coursera</p>
							</div>
						</div>
						<div className='w-max flex-shrink-0 items-center h-max flex relative bg-white card bg-white rounded-[18px] p-[20px] text-[17px]'>
							<div className='w-[180px] h-full overflow-hidden rounded-[9px]'>
								<img
									src='/lesson1.webp'
									height={200}
									width={300}
									className='cover rounded-[9px]'
								/>
							</div>
							<div className='px-[20px] flex flex-col'>
								<h2 className='max-w-[220px] font-medium text-[18px] leading-[120%] xl:text-[20px] '>
									Preventing Harassment in the Workplace
								</h2>
								<p className='text-gray'>Coursera</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};
export default LearningHub;
