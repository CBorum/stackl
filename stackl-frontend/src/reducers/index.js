import { combineReducers } from 'redux'

import Posts from './PostReducer';
import Load from './LoadReducer';
import Login from './LoginReducer';
import Modal from './ModalReducer';
import SavedPost from './SavedPostReducer';
import User from './UserReducer';

const AppStore = combineReducers({
    Load,
    Posts,
    Login,
    Modal,
    SavedPost,
    User,
});

export default AppStore