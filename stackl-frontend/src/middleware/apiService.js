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
const deployHost = process.env.REACT_APP_STACKL_DEPLOYHOST || null;

export let getAddress = "";
if(deployHost !== null) {
  getAddress = (endpoint) => `${deployHost}/${endpoint}`;
} else{
  getAddress = (endpoint) => `${host}:${port}/${endpoint}`;
}

export const apiCall = (dispatch, endpoint, method, data) => {
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

		if(!res.ok){
			throw Error(res.statusText)
		}

		return res.text()
	}).then(responseText => {
		if(!responseText){
			return;
		}

		try{
			return JSON.parse(responseText);
		}catch(err){
			return responseText
		}
	}).catch((e) => {
		throw Error(e)
	}).finally(dispatch.bind(null, endLoad()))
};