import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'

import { createStore } from 'redux'

import AppStore from './reducers'
import middleware from './middleware'

import 'popper.js';
import 'jquery';
import 'bootstrap';
import './scss/index.scss';

const store = createStore(
    AppStore,
    middleware,
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

