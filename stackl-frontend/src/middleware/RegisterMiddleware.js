import {REGISTER} from "../actions/ActionTypes";
import { loginDone} from '../actions/LoginActions';
import { apiCall } from './apiService';
import {hideModal, MODAL_IDS} from "../actions/ModalActions";

const RegisterMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case REGISTER:
            apiCall(dispatch, `api/login/register`, 'POST', action.payload)
                .then(apiCall.bind(null, dispatch, `api/login/authenticate`, 'POST', action.payload))
                .then(res => {
                    dispatch(loginDone(res));
                    dispatch(hideModal(MODAL_IDS.REGISTER))
                })
                .catch(e => {
                    console.log("error: " + e)
                });
            break;
        default:
            break;
    }
};

export default RegisterMiddleware