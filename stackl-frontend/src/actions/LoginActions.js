import {LOGIN, LOGIN_DONE, LOGOUT} from './ActionTypes';

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: {
            username, password
        },
    }
};

export const loginDone = ({token, username, userId}) => {
    return {
        type: LOGIN_DONE,
        payload: {
            token, username, userId
        }
    }
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: null
    }
};