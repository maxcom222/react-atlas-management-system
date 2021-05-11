import axios from 'axios';

export const CURRENT = new Date();
export const CUR_YEAR = CURRENT.getFullYear();

export function isEmpty(value) {
    return value ? value : "";
}
export const getValideData = (object) => {
	var res = {};
	Object.keys(object).map(key => {
		if(object[key]) {
			res[key] = object[key]
		}		
	});
	return res;
}
export const getFormDataFromObject = (object) => {
	var formData = new FormData();
	for ( var key in object ) {
		if(object[key]) {
			formData.append(key, object[key]);
		}
	}
	return formData;
}
export const getImageURL = (src) => {
	const API_URL = axios.defaults.baseURL;
	return `${API_URL}${src}`;
}
export const getDateFormat = (str : String) => {

	return str ? str.split('-').join('/') : ""
}