import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    posts: null
};

const Posts = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
        case ActionTypes.GET_POSTS_DONE:
            return Object.assign({}, state, { posts: action.payload })
        case ActionTypes.GET_SINGLE_POST_DONE:
            return Object.assign({}, state, { singlePost: action.payload })
        case ActionTypes.RESET_POSTS:
            return Object.assign({}, state, {posts: action.payload})
        default:
            return state
    }
};

export default Posts