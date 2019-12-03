import {startLoad, endLoad} from '../actions/LoadActions';

const getHeaders = () => {
	// let tmpToken = cookies.get(tokenName)
	return {
		'Content-Type': 'application/json',
		// 'Authorization': 'Bearer ' + tmpToken
	}	
}

export const getServer = () => {
	if (window.location.host.indexOf('localhost') !== -1) {
        return `//localhost:5000/`
	}
	
	return `//${window.location.host}/`
}

export const getAddress = (endpoint) => {
	return `${getServer()}/${endpoint}`
}

export const apiCall = (dispatch, endpoint, method, data) => {
	return fetch(getAddress(endpoint), {
		headers: getHeaders(),
		method: method,
		body: JSON.stringify(data)
	}).then((res) => {
		if (res.status === 403) {
			dispatch(doLogout())
		}

		if (res.ok) {
			return res.json()
		} else {
			throw Error(res.statusText)
		}
	}).catch((e) => {
		// dispatch(apiError(e.message))
		throw Error(e.statusText)
	})
}