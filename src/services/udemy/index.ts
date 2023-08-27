import axios from 'axios';

const BASE_URL = import.meta.env.VITE_UDEMY_BASE_URL;
const ID = import.meta.env.VITE_UDEMY_ID;
const SECRET = import.meta.env.VITE_UDEMY_SECRET;

export const fetchCourses = async () => {
	const data = await axios.get(
		`${BASE_URL}/courses/?course_category=Business&course_subcategory=Human Resources`,
		{
			headers: {
				Authorization: `Basic ${btoa(`${ID}:${SECRET}`)}`,
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	console.log(data);
};
