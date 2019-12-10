import { GET_SAVED_POSTS} from '../actions/ActionTypes'
import { getSavedPostsDone } from '../actions/SavedPostsActions'
import { apiCall } from './apiService'

const SavedPostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case GET_SAVED_POSTS:
            const userId = getState().Login.userId;
            apiCall(dispatch, `api/user/${userId}/marking`, 'GET')
                .then(savedPosts => {
                    dispatch(getSavedPostsDone(savedPosts))
                })
                .catch(e => {
                    console.log("error: " + e)
                });
            break;
        default:
            break;
    }
}

export default SavedPostMiddleware