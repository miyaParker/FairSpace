import DashboardLayout from '../layouts/DashboardLayout';
import NavBar from '../components/NavBar';
import {resources} from '../constants';
import {icons} from '../constants';

const LearningHub = () => {
	return (
		<DashboardLayout>
			<div className='h-full w-full flex flex-col'>
				<NavBar title='Learning Hub' />
				<div className='overflow-y-scroll pt-[30px]'>
					<div>
						{resources?.courses?.length
							? resources.courses.slice(0, 1).map((course, index) => (
								<a href={course.link} target='_blank' key={index}>
									<div
										className='featured relative h-[600px] sm:h-[450px] md:h-[500px] w-full flex gap-[20px] bg-white/90 bg-[url("/featured.jpg")] bg-center bg-cover rounded-[18px]'>
										<div className='absolute bottom-[30px] left-[30px] flex flex-col text-[17px]'>
											<p className='z-20  text-white text-[20px]  mb-2'>
												Featured
											</p>
											<h2
												className='mb-4 relative z-20 max-w-[620px] mb-1 font-bold text-white text-[34px] md:text-[40px] lg:text-[48px] leading-[120%] '>
												{course.title}
											</h2>
											<p className='z-20  w-full  md:max-w-[520px] lg:max-w-[640px] xl:max-w-[720px] 2xl:max-w-[840px] text-white text-[18px] md:text-[16px]'>
												{course.description}
											</p>
										</div>
										{/*<div className='arrow z-20 hidden md:block absolute bottom-10 right-[20px] md:right-[20px] lg:right-[20px] xl:right-[128px] '>*/}
										{/*	<img*/}
										{/*		src='/arrow-right-white.svg'*/}
										{/*		width={64}*/}
										{/*		height={64}*/}
										{/*	/>*/}
										{/*</div>*/}
										<div className='w-full h-full absolute bg-black/40 bottom-0 left-0 rounded-[18px]'></div>
									</div>
								</a>
							))
							: null}
						<div className='flex justify-between items-start mb-[20px] mt-[40px] '>
							<h2 className='text-[28px] font-bold'>Courses</h2>
						</div>
						<div className='h-max w-full flex gap-[20px] items-end overflow-hidden '>
							<div className='w-full grid grid-cols-1 min-[580px]:grid-cols-2 min-[2000px]:grid-cols-4 gap-[20px]'>
								{resources?.courses?.length
									? resources.courses.slice(0, 4).map((course, index) => (
										<a href={course.link} target='_blank' key={index}>
											<div className='relative h-[160px] w-full flex gap-[20px] bg-white/90 p-[18px] rounded-[18px]'>
												<div
													className={`w-[160px] md:w-[250px] bg-[#F8F0FA] h-[120px] rounded-[9px] ${course.image} bg-no-repeat bg-center bg-cover`}></div>
												<div className='flex flex-col text-[17px]'>
													<h2 className='text-[14px]sm:text-[16px] max-w-[260px] mb-1 font-medium leading-[120%] lg:text-[16px] '>
														{course.title.length > 70
															? `${course.title.slice(0, 70)}...`
															: course.title}
													</h2>
													<p className='text-gray text-[13px]'>
														{course.platform}
													</p>
												</div>
											</div>
										</a>
									))
									: null}
							</div>
						</div>
					</div>
					<div>
						<div className='flex justify-between items-start mb-[20px] my-[40px]'>
							<h2 className='text-[28px] font-bold'>Articles</h2>
						</div>
						<div className='h-max w-full flex  items-end overflow-hidden '>
							<div className='w-full grid min-[520px]:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
								{resources?.articles?.length
									? resources.articles.slice(0, 4).map((article, index) => (
										<a href={article.link} target='_blank' key={index}>
											<div
												className='w-full flex-shrink-0 h-[300px] flex flex-col relative bg-white card bg-white rounded-[18px] p-[18px] sm:text-[17px]md:text-[15px] lg:text-[17px]'>
												<div
													className={`bg-[#F8F0FA] h-[150px] rounded-[9px] ${article.image} bg-no-repeat bg-center bg-cover`}></div>
												<div className='flex flex-col relative text-[17px]'>
													<h2 className='max-w-[500px] my-3 font-medium text-[17px] leading-[120%] xl:text-[20px]text-[14px]sm:text-[16px] max-w-[260px] mb-1 font-medium leading-[120%] lg:text-[16px] '>
														{article.title.length > 70
															? `${article.title.slice(0, 70)} ...`
															: article.title}
													</h2>
													<p className='text-gray text-[16px]'>
														{article.platform}
													</p>
												</div>
											</div>
										</a>
									))
									: null}
							</div>
						</div>
					</div>
					<div className='mb-[40px]'>
						<div className='flex justify-between items-start mb-[20px] mt-[60px]'>
							<h2 className='text-[28px] font-bold'>Podcasts</h2>
						</div>
						<div className=''>
							<div className='w-full grid min-[600px]:grid-cols-2 xl:grid-cols-3 gap-[20px]'>
								{resources?.podcasts?.length
									? resources.podcasts.slice(0, 4).map((podcast, index) => (
										<a href={podcast.link} target='_blank' key={index}>
											<div className='h-[120px] w-full flex gap-[20px] bg-white p-[20px] rounded-[18px]'>
												<div className='rounded-[24px] h-[100px] w-[80px]'>
													<div
														className={`w-[80px] bg-[#F8F0FA] h-[80px] rounded-[14px] ${
															icons[Math.floor(Math.random() * 4)]
														} bg-no-repeat bg-center bg-[length:48px_48px]`}></div>
												</div>
												<div className='flex flex-col text-[17px]'>
													<h2 className='max-w-[250px] mb-1 font-medium leading-[120%] text-[18px] sm:text-[16px]  lg:text-[16px] xl:text-[20px] '>
														{podcast.title.length > 45
															? `${podcast.title.slice(0, 45)} ...`
															: podcast.title}
													</h2>
													<p className='text-gray text-[16px] xl:text-[20px] text-[14px]sm:text-[16px] max-w-[260px] mb-1 font-medium leading-[120%] lg:text-[16px]'>
														{podcast.platform}
													</p>
												</div>
											</div>
										</a>
									))
									: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};
export default LearningHub;
