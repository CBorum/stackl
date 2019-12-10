import {LOGIN, LOGIN_DONE, LOGOUT} from './ActionTypes';

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: {
            username, password
        },
    }
};

export const loginDone = ({token, username, id}) => {
    return {
        type: LOGIN_DONE,
        payload: {
            token, username, id
        }
    }
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: null
    }
};