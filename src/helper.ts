import {monthArray} from './constants';

export const createDateString = (date) => {
	const stringArray = date?.split('/');
	const day = stringArray[0];
	const month = monthArray[parseInt(stringArray[1]) - 1];
	const year = stringArray[2];
	return `${month} ${day}, ${year} `;
};
