import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'popper.js';

import './scss/fontawesome/css/all.css'

import 'jquery';
import 'bootstrap';
import './scss/index.scss';

import {loginDone} from './actions/LoginActions'

import App from './App';
import store from './store';

{
    const token = localStorage.getItem('token');

    if(token){
        const username = localStorage.getItem('username');
        const id = localStorage.getItem('id');

        const payload = {token, username, id};

        store.dispatch(loginDone(payload));
    }
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

