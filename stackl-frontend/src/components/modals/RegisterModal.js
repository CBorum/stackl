import React from "react";
import ModalWrapper from './ModalWrapper';
import {MODAL_IDS} from '../../actions/ModalActions';
import store from "../../store";
import {register} from "../../actions/RegisterActions";

const makeToast = (msg, options = {}) => {
    alert(msg);
};

const usernameInputId = 'modal_new_username';
const passwordInputId = 'modal_new_password';

const unsafeGetInputValue = query => (document.querySelector(query) || {}).value;

const unsafeRegister = () => {
    const username = unsafeGetInputValue(`#${usernameInputId}`);
    const password = unsafeGetInputValue(`#${passwordInputId}`);

    if(!username || !password){
        makeToast('Username or password missing');
        return;
    }

    store.dispatch(register(username, password));
};

const onEnter = handler => event => {
    if (event.key === 'Enter') {
        handler();
    }
};

function RegisterModal() {
    return (
        <ModalWrapper modalId={MODAL_IDS.REGISTER}>
            <h1 className="display-4 text-center mb-5">Register</h1>
            <div className="form-group mb-3 mw-450 mx-auto">
                <label htmlFor={usernameInputId}>Username</label>
                <input type="text" className="form-control" id={usernameInputId} aria-describedby="emailHelp" placeholder="Enter username"/>
            </div>
            <div className="form-group mb-5 mw-450 mx-auto">
                <label htmlFor={passwordInputId}>Password</label>
                <input onKeyPress={onEnter(unsafeRegister)} type="password" className="form-control" id={passwordInputId} aria-describedby="emailHelp" placeholder="Enter password"/>
            </div>
            <button onClick={unsafeRegister} className="btn btn-primary btn-block mw-450 mx-auto">Submit</button>
        </ModalWrapper>
    );
}

export default RegisterModal;