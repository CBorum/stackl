import React from "react";
import ModalWrapper from './ModalWrapper';
import {MODAL_IDS} from '../../actions/ModalActions';
import {login} from '../../actions/LoginActions';


// const bindValidatorToElement = invalidClass => validator => element => {
//     element.addEventListener('change', event => {
//         if(!validator(input.))
//     })
// }

const invalidClass = 'invalid';

const validateElement = validator => event => {
    if(!validator(event.target.value)){
        event.target.classList.add(invalidClass)
    }else{
        event.target.classList.remove(invalidClass)
    }
};

const validateUsernameElement = validateElement(username => typeof username === 'string' && username > 4);
const validatePasswordElement = validateElement(password => typeof password === 'string' && password > 4);

const unsafeGetInputValue = query => (document.querySelector(query) || {}).value;

const

// onKeyPress={onSearchInputKeyEvent}

const unsafeLogin = (props) => {
    const username = unsafeGetInputValue('#login');
    const password = unsafeGetInputValue('#password');

    if(!username || !password){
        return;
    }

    props.dispatch(login(username, password));
};

function LoginModal(props){
    return (
        <ModalWrapper modalId={MODAL_IDS.LOGIN}>
            <h1 className="display-4 text-center mb-5">Login</h1>
            <div className="form-group mb-3 mw-450 mx-auto">
                <label htmlFor="username">Username</label>
                <input onChange={e => this.setState({  })} type="email" className="form-control" id="username" placeholder="Enter username"/>
            </div>
            <div className="form-group mb-5 mw-450 mx-auto">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password"/>
            </div>
            <button onClick={unsafeLogin.bind(null, props)} className="btn btn-primary btn-block mw-450 mx-auto">Submit</button>
        </ModalWrapper>
    )
}


export default LoginModal;