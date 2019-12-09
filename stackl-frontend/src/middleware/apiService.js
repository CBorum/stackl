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

const host = process.env.STACKL_API_HOST || 'http://localhost';
const port = process.env.STACKL_API_PORT || 5000;

export const getAddress = (endpoint) => `${host}:${port}/${endpoint}`;

export const apiCall = (dispatch, endpoint, method, data) => {
    console.log(`apiCall, getAddress(${endpoint}):`, getAddress(endpoint));
	dispatch(startLoad());
	return fetch(getAddress(endpoint), {
		headers: getHeaders(),
		method: method,
		body: JSON.stringify(data)
	}).then((res) => {
		if (res.status === 403) {
			dispatch(logout());
			return;
		}

		if (res.ok) {
			try{
                return res.json()
			}catch(err){
				return res.text();
			}

		} else {
			throw Error(res.statusText)
		}
	}).catch((e) => {
		throw Error(e)
	}).finally(dispatch.bind(null, endLoad()))
};