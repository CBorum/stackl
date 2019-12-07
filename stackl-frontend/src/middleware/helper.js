import {startLoad, endLoad} from '../actions/LoadActions';
import {logout} from '../actions/LoginActions';
import store from '../store';


const getHeaders = () => {
	const headers = {
        'Content-Type': 'application/json'
    }

    const state = store.getState();

	if(state.Login.token){
		headers['Authorization'] = 'Bearer ' + state.Login.token
	}

	return headers;
}

// export const getServer = () => {
// 	if (window.location.host.indexOf('localhost') !== -1) {
//         return `//localhost:5000/`
// 	}
	
// 	return `//${window.location.host}/`
// }

const host = process.env.STACKL_API_HOST || 'http://localhost';
// const host = 'http://212.47.241.119';
const port = process.env.STACKL_API_PORT || 5000;

console.log('host:')
console.log(typeof host)
console.log(host)

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
			return res.json()
		} else {
			throw Error(res.statusText)
		}
	}).catch((e) => {
		// dispatch(apiError(e.message))
		throw Error(e.statusText)
	}).finally(dispatch.bind(null, endLoad()))
}