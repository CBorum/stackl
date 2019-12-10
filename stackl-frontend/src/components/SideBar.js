import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';
import store from "../store";
import { login, logout } from "../actions/LoginActions";
import { register } from "../actions/RegisterActions";
import SearchHistory from './SearchHistory';

const makeToast = (msg, options = {}) => {
    alert(msg);
};

const usernameInputId = 'sidebar_username';
const passwordInputId = 'sidebar_password';

const unsafeGetInputValue = query => (document.querySelector(query) || {}).value;

const unsafeLogin = () => {
    const username = unsafeGetInputValue(`#${usernameInputId}`);
    const password = unsafeGetInputValue(`#${passwordInputId}`);

    if (!username || !password) {
        makeToast('Username or password missing');
        return;
    }

    store.dispatch(login(username, password));
};

const unsafeRegister = () => {
    const username = unsafeGetInputValue(`#${usernameInputId}`);
    const password = unsafeGetInputValue(`#${passwordInputId}`);

    if (!username || !password) {
        makeToast('Username or password missing');
        return;
    }

    store.dispatch(register(username, password));
};


const VIEW_IDS = {
    MENU: 'MENU',
    HISTORY: 'HISTORY',
    MARKINGS: 'MARKINGS'
}

const dispatchLogout = () => {
    store.dispatch(logout());
};

const mapStateToProps = (state, ownProps) => ({
    username: state.Login.username,
    token: state.Login.token
});

class SideBar extends React.Component {
    state = {
        viewId: VIEW_IDS.MENU
    }

    setView(viewId) {
        this.setState({
            viewId
        })
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="col-3 pt-3 sideBarBorder">
                {this.props.username &&
                    /*logged in*/

                    <span>
                        <p className="small text-muted mb-0">logged in as:</p>
                        <h5 className="mb-4 text-info">{this.props.username}</h5>
                        <button onClick={dispatchLogout} className="btn btn-outline-secondary btn-block btn-sm">logout</button>

                        <hr />

                        {this.state.viewId === VIEW_IDS.MENU &&
                            <span>
                                <button onClick={this.setView.bind(this, VIEW_IDS.HISTORY)} type="button" className="btn btn-link">Search history</button>
                                <button onClick={this.setView.bind(this, VIEW_IDS.MARKINGS)} type="button" className="btn btn-link">Saved posts</button>
                            </span>
                        || this.state.viewId === VIEW_IDS.HISTORY &&
                            <span>
                                <button onClick={this.setView.bind(this, VIEW_IDS.MENU)} type="button" className="btn btn-link btn-block">Back</button>
                                <SearchHistory></SearchHistory>
                            </span>
                        || this.state.viewId === VIEW_IDS.MARKINGS &&
                            <span>
                                <button onClick={this.setView.bind(this, VIEW_IDS.MENU)} type="button" className="btn btn-link btn-block">Back</button>
                                markings
                            </span>
                        }
                    </span>
                    ||
                    /*not logged in*/
                    <span>
                        <h5 className="mb-4">Login/Register</h5>
                        <div className="form-group mb-2">
                            <label className="small text-muted" htmlFor={usernameInputId}>Username</label>
                            <input type="text" className="form-control" id={usernameInputId} placeholder="Enter username" />
                        </div>
                        <div className="form-group mb-4">
                            <label className="small text-muted" htmlFor={passwordInputId}>Password</label>
                            <input type="password" className="form-control" id={passwordInputId} placeholder="Enter password" />
                        </div>
                        <button onClick={unsafeLogin} className="btn btn-primary btn-block">Login</button>
                        <button onClick={unsafeRegister} className="btn btn-outline-secondary btn-block">Register</button>

                    </span>
                }

            </div>
        );
    }
}

export default connect(mapStateToProps)(SideBar);