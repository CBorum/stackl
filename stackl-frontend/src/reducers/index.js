import { combineReducers } from 'redux'

import Posts from './PostReducer';
import Load from './LoadReducer';
import Login from './LoginReducer';
import Modal from './ModalReducer';

const AppStore = combineReducers({
    Load,
    Posts,
    Login,
    Modal,
});

export default AppStore