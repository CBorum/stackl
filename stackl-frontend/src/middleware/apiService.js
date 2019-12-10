import {startLoad, endLoad} from '../actions/LoadActions';
import {logout} from '../actions/LoginActions';
import store from '../store';


const getHeaders = () => {
	const headers = {
        'Content-Type': 'application/json'
    };

    const state = store.getState();

	if(state.Login.token){
		headers['Authorization'] = 'Bearer ' + state.Login.token
	}

	return headers;
};

const host = process.env.REACT_APP_STACKL_API_HOST || 'http://localhost';
const port = process.env.REACT_APP_STACKL_API_PORT || 5000;

export const getAddress = (endpoint) => `${host}:${port}/${endpoint}`;

export const sleepAsync = ms => {
	store.dispatch(startLoad());
	return new Promise(resolve => {
		setTimeout(resolve, ms);
		store.dispatch(endLoad())
	});
};

export const apiCall = (dispatch, endpoint, method, data) => {
	dispatch(startLoad());
	return fetch(getAddress(endpoint), {
		headers: getHeaders(),
		method: method,
		body: JSON.stringify(data)
	}).then((res) => {
		console.log(1);
		if (res.status === 403) {
			dispatch(logout());
			return;
		}
		console.log(2);

		if(!res.ok){
			throw Error(res.statusText)
		}

		console.log(3);
		return res.text()
	}).then(responseText => {
		console.log(4);

		if(responseText){
			return;
		}
		console.log(5);

		try{
			return JSON.parse(responseText);
		}catch(err){
			return responseText
		}
	}).catch((e) => {
		throw Error(e)
	}).finally(dispatch.bind(null, endLoad()))
};