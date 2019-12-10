import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'popper.js';
import 'jquery';
import 'bootstrap';
import './scss/index.scss';

import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

