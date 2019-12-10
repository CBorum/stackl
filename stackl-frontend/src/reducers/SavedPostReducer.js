import { GET_SAVED_POSTS_DONE } from '../actions/ActionTypes'

const defaultState = {
    savedPosts: null
};

const SavedPosts = (state = defaultState, action) => {
    switch (action.type) {
        case GET_SAVED_POSTS_DONE:
            return Object.assign({}, state, { savedPosts: action.payload });
        default:
            return state
    }
};

export default SavedPosts