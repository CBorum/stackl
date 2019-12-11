import { LOGIN, LOGIN_DONE } from "../actions/ActionTypes";
import { loginDone } from '../actions/LoginActions';
import { hideModal, MODAL_IDS } from '../actions/ModalActions';
import { getSavedPosts } from '../actions/SavedPostsActions';
import { apiCall } from './apiService';

const LoginMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case LOGIN:
            apiCall(dispatch, `api/login/authenticate`, 'POST', action.payload)
                .then(res => {
                    dispatch(loginDone(res));
                })
                .catch(e => {
                    console.log("error: " + e)
                });
            break;
        case LOGIN_DONE:
            dispatch(hideModal(MODAL_IDS.LOGIN));
            dispatch(getSavedPosts());
            break;
        default:
            break;
    }
};

export default LoginMiddleware