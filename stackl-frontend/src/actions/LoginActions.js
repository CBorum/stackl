import {LOGIN, LOGIN_DONE, LOGOUT} from './ActionTypes';

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: {
            username, password
        },
    }
};

export const loginDone = ({token}) => {
    return {
        type: LOGIN_DONE,
        payload: token,
    }
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: null
    }
};