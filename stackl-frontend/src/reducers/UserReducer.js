import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    searchHistory: null
}

const User = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SEARCH_HISTORY_DONE:
            return Object.assign({}, state, { searchHistory: action.payload })
        default:
            return state
    }
}

export default User