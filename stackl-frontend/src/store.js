import { createStore } from 'redux'
import AppStore from './reducers'
import middleware from './middleware'

const store = createStore(
    AppStore,
    middleware,
);

export default store;