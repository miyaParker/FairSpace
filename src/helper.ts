export const createDateString = (date) => {
	const incidentDate = new Date(date);
	const stringArray = incidentDate?.toString().split(' ');
	console.log(stringArray);
	const day = stringArray[2];
	const month = stringArray[1];
	const year = stringArray[3];
	return `${month} ${day}, ${year} `;
};
