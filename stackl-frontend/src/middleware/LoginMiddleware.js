import {LOGOUT, LOGIN, LOGIN_DONE} from "../actions/ActionTypes";
import { login, logout, loginDone} from '../actions/LoginActions';
import { hideModal, MODAL_IDS} from '../actions/ModalActions';
import { apiCall } from './apiService';

const LoginMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case LOGIN:
                apiCall(dispatch, `api/login/authenticate`, 'POST', action.payload)
                    .then(res => {
                        dispatch(loginDone(res));
                        dispatch(hideModal(MODAL_IDS.LOGIN))
                    })
                    .catch(e => {
                        console.log("error: " + e)
                    });
            break;
        default:
            break;
    }
};

export default LoginMiddleware