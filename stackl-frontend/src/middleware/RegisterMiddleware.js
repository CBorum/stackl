import {REGISTER, REGISTER_DONE, LOGIN} from "../actions/ActionTypes";
import { loginDone} from '../actions/LoginActions';
import { apiCall } from './helper';

const RegisterMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case REGISTER:
            apiCall(dispatch, `api/login/register`, 'POST', action.payload)
                .then(apiCall(dispatch, `api/login/authenticate`, 'POST', action.payload))
                .then(res => dispatch(loginDone(action.payload)))
                .catch(e => {
                    console.log("error: " + e)
                });
            break;
        default:
            break;
    }
};

export default RegisterMiddleware