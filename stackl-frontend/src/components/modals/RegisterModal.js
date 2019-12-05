import React from "react";
import ModalWrapper from './ModalWrapper';
import {MODAL_IDS} from '../../actions/ModalActions';

function RegisterModal() {
    return (
        <ModalWrapper modalId={MODAL_IDS.REGISTER}>
            <h1 className="display-4 text-center mb-5">Register</h1>
            <div className="form-group mb-3 mw-450 mx-auto">
                <label htmlFor="username">Username</label>
                <input type="email" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username"/>
            </div>
            <div className="form-group mb-5 mw-450 mx-auto">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password"/>
            </div>
            <button className="btn btn-primary btn-block mw-450 mx-auto">Submit</button>
        </ModalWrapper>
    );
}

export default RegisterModal;