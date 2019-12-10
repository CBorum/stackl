import { combineReducers } from 'redux'

import Posts from './PostReducer';
import Load from './LoadReducer';
import Login from './LoginReducer';
import Modal from './ModalReducer';
import SavedPost from './SavedPostReducer';

const AppStore = combineReducers({
    Load,
    Posts,
    Login,
    Modal,
    SavedPost,
});

export default AppStore