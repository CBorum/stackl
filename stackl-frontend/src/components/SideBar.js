import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';
import store from "../store";
import SearchHistory from './SearchHistory';
import SavedPosts from './SavedPosts';
import {login, logout} from "../actions/LoginActions";
import {register} from "../actions/RegisterActions";
import { withRouter } from 'react-router-dom'
import {passwordValidator, usernameValidator} from "../helpers/validation";

const makeToast = (msg, options = {}) => {
    alert(msg);
};

const usernameInputId = 'sidebar_username';
const passwordInputId = 'sidebar_password';

const VIEW_IDS = {
    MENU: 'MENU',
    HISTORY: 'HISTORY',
    MARKINGS: 'MARKINGS'
};

const onEnter = handler => event => {
    if (event.key === 'Enter') {
        handler();
    }
};

const dispatchLogout = () => {
    store.dispatch(logout());
};

const mapStateToProps = (state, ownProps) => ({
    username: state.Login.username,
    token: state.Login.token
});

class SideBar extends React.Component {
    state = {
        viewId: VIEW_IDS.MENU,
        username: '',
        password: '',
        usernameErrorString: '',
        passwordErrorString: '',
        usernameInputValidationClass: '',
        passwordInputValidationClass: '',
    };

    setView(viewId) {
        this.setState({
            viewId
        })
    }

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
            passwordInputValidationClass: ''
        });
    }

    register(){

        const usernameError = usernameValidator(this.state.username);
        const passwordError = passwordValidator(this.state.password);

        if(usernameError){
            this.setState({
                usernameErrorString: usernameError.message,
                usernameInputValidationClass: 'is-invalid'
            })
        }

        if(passwordError){
            this.setState({
                passwordErrorString: passwordError.message,
                passwordInputValidationClass: 'is-invalid'
            })
        }

        if(usernameError !== undefined || passwordError !== undefined){
            return;
        }

        store.dispatch(register(this.state.username, this.state.password));
    }

    login(){
        store.dispatch(login(this.state.username, this.state.password));
    }

    registerOnEnter(event){
        onEnter(this.register.bind(this))(event);
    }

    render() {
        if(this.props.location.pathname === "/") return null
        return (
            <div className="col-12 col-md-3 sideBarBorder">
                <div className="side-bar-sticky-content pt-3">
                    { ( this.props.username &&
                    /*logged in*/

                    <span>
                        <p className="small text-muted mb-0">logged in as:</p>
                        <h5 className="mb-4 text-info">{this.props.username}</h5>
                        <button onClick={dispatchLogout} className="btn btn-outline-secondary btn-block btn-sm">logout</button>

                        <hr />

                        { ( this.state.viewId === VIEW_IDS.MENU && 
                        <span>
                            <button onClick={this.setView.bind(this, VIEW_IDS.HISTORY)} type="button" className="btn btn-link">Search history</button>
                            <button onClick={this.setView.bind(this, VIEW_IDS.MARKINGS)} type="button" className="btn btn-link">Saved posts</button>
                        </span>)
                        || ( this.state.viewId === VIEW_IDS.HISTORY &&
                        <span>
                            <button onClick={this.setView.bind(this, VIEW_IDS.MENU)} type="button" className="btn btn-link btn-block">Back</button>
                            <SearchHistory></SearchHistory>
                        </span> )
                        || ( this.state.viewId === VIEW_IDS.MARKINGS &&
                        <span>
                            <button onClick={this.setView.bind(this, VIEW_IDS.MENU)} type="button" className="btn btn-link btn-block">Back</button>
                            <SavedPosts/>
                        </span> )
                        }
                    </span> )
                    ||
                    /*not logged in*/
                    <span>
                        <div className="form-group mb-2">
                            <label className="small text-muted" htmlFor={usernameInputId}>Username</label>
                            <input onChange={this.setUsername.bind(this)} type="text" className={`form-control ${this.state.usernameInputValidationClass}`} id={usernameInputId} placeholder="Enter username" />
                            <p className="mb0 small muted-text text-danger">{this.state.usernameErrorString}</p>
                        </div>
                        <div className="form-group mb-4">
                            <label className="small text-muted" htmlFor={passwordInputId}>Password</label>
                            <input onChange={this.setPassword.bind(this)} onKeyPress={this.registerOnEnter.bind(this)} type="password" className={`form-control ${this.state.passwordInputValidationClass}`} id={passwordInputId} placeholder="Enter password" />
                            <p className="mb0 small muted-text text-danger">{this.state.passwordErrorString}</p>
                        </div>
                        <button onClick={this.login.bind(this)} className="btn btn-primary btn-block">Login</button>
                        <button onClick={this.register.bind(this)} className="btn btn-outline-secondary btn-block">Register</button>
                    </span>
                    }
                </div>
            </div>
        );
    }
}

SideBar = withRouter(SideBar)

export default connect(mapStateToProps)(SideBar);