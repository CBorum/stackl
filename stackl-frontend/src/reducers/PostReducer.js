import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    posts: null
};

const Posts = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return Object.assign({}, state, { posts: action.payload });
        default:
            return state
    }
};

export default Posts