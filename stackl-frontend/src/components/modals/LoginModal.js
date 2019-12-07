import React from "react";
import ModalWrapper from './ModalWrapper';
import {hideModal, MODAL_IDS} from '../../actions/ModalActions';
import {login} from '../../actions/LoginActions';
import store from '../../store';

const makeToast = (msg, options = {}) => {
    alert(msg);
};

const usernameInputId = 'modal_username';
const passwordInputId = 'modal_password';

const unsafeGetInputValue = query => (document.querySelector(query) || {}).value;

const unsafeLogin = () => {
    const username = unsafeGetInputValue(`#${usernameInputId}`);
    const password = unsafeGetInputValue(`#${passwordInputId}`);

    if(!username || !password){
        makeToast('Username or password missing');
        return;
    }

    store.dispatch(login(username, password));
};

function LoginModal(props){
    return (
        <ModalWrapper modalId={MODAL_IDS.LOGIN}>
            <h1 className="display-4 text-center mb-5">Login</h1>
            <div className="form-group mb-3 mw-450 mx-auto">
                <label htmlFor={usernameInputId}>Username</label>
                <input type="text" className="form-control" id={usernameInputId} placeholder="Enter username"/>
            </div>
            <div className="form-group mb-5 mw-450 mx-auto">
                <label htmlFor={passwordInputId}>Password</label>
                <input type="password" className="form-control" id={passwordInputId} placeholder="Enter password"/>
            </div>
            <button onClick={unsafeLogin} className="btn btn-primary btn-block mw-450 mx-auto">Submit</button>
        </ModalWrapper>
    )
}


export default LoginModal;