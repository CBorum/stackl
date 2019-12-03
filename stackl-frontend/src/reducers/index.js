import { combineReducers } from 'redux'

import Test from './TestReducer'
import Posts from './PostReducer'

const AppStore = combineReducers({
    Test,
    Posts,
});

export default AppStore