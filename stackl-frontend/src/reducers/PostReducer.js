import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    test: ""
}

const Test = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.POST_SEARCH:
            return Object.assign({}, state, { isLoading: true });
        case ActionTypes.POST_SEARCH_DONE:
            return Object.assign({}, state, { posts: action.payload });
        default:
            return state
    }
}

export default Test