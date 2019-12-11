import React from "react";
import ModalWrapper from './ModalWrapper';
import {MODAL_IDS} from '../../actions/ModalActions';
import store from "../../store";
import {register} from "../../actions/RegisterActions";
import {usernameValidator, passwordValidator} from '../../helpers/validation';

const usernameInputId = 'modal_new_username';
const passwordInputId = 'modal_new_password';


// const makeToast = (msg, options = {}) => {
//     alert(msg);
// };
//
// const unsafeGetInputValue = query => (document.querySelector(query) || {}).value;
//
// const unsafeRegister = () => {
//     const username = unsafeGetInputValue(`#${usernameInputId}`);
//     const password = unsafeGetInputValue(`#${passwordInputId}`);
//
//     if(!username || !password){
//         makeToast('Username or password missing');
//         return;
//     }
//
//     store.dispatch(register(username, password));
// };

const onEnter = handler => event => {
    if (event.key === 'Enter') {
        handler();
    }
};

class RegisterModal extends React.Component {

    state = {
        username: '',
        password: '',
        usernameErrorString: '',
        passwordErrorString: '',
        usernameInputValidationClass: '',
        passwordInputValidationClass: '',
    };

    setUsername(event){
        this.setState({
            username: event.target.value,
            usernameErrorString: '',
            usernameInputValidationClass: ''
        });
    }

    setPassword(event){
        this.setState({
            password: event.target.value,
            passwordErrorString: '',
            passwordInputValidationClass: '',
        });
    }

    setAndValidateUsername(event){
        const validationError = usernameValidator(event.target.value);

        this.setState({
            username: event.target.value,
            usernameErrorString: validationError !== undefined ? validationError.message : '',
            usernameInputValidationClass: validationError !== undefined ? 'is-invalid' : 'is-valid',
        });
    }

    setAndValidatePassword(event){
        const validationError = passwordValidator(event.target.value);

        this.setState({
            password: event.target.value,
            passwordErrorString: validationError !== undefined ? validationError.message : '',
            passwordInputValidationClass: validationError !== undefined ? 'is-invalid' : 'is-valid',
        });
    }

    register(){
        const usernameError = usernameValidator(this.state.username);
        const passwordError = passwordValidator(this.state.password);

        if(usernameError !== undefined || passwordError !== undefined){
            return;
        }

        store.dispatch(register(this.state.username, this.state.password));
    }

    registerOnEnter(event){
        onEnter(this.register.bind(this))(event);
    }

    render(){return (
        <ModalWrapper modalId={MODAL_IDS.REGISTER}>
            <h1 className="display-4 text-center mb-5">Register</h1>
            <div className="form-group mb-3 mw-450 mx-auto">
                <label htmlFor={usernameInputId}>Username</label>
                <input onChange={this.setUsername.bind(this)} onBlur={this.setAndValidateUsername.bind(this)} type="text" className={`form-control ${this.state.usernameInputValidationClass}`} id={usernameInputId} aria-describedby="emailHelp" placeholder="Enter username"/>
                <p className="mb0 small muted-text text-danger">{this.state.usernameErrorString}</p>
            </div>

            <div className="form-group mb-5 mw-450 mx-auto">
                <label htmlFor={passwordInputId}>Password</label>
                <input onChange={this.setPassword.bind(this)} onBlur={this.setAndValidatePassword.bind(this)} onKeyPress={this.registerOnEnter.bind(this)} type="password" className={`form-control ${this.state.passwordInputValidationClass}`} id={passwordInputId} aria-describedby="emailHelp" placeholder="Enter password"/>
                <p className="mb0 small muted-text text-danger">{this.state.passwordErrorString}</p>
            </div>

            <button onClick={this.register.bind(this)} className="btn btn-primary btn-block mw-450 mx-auto">Submit</button>
        </ModalWrapper>
    )}
}

export default RegisterModal;