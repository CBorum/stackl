import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    isLoading: false
};

const Test = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.POST_SEARCH:
            return Object.assign({}, state, {
                test: action.payload
            });
        default:
            return state
    }
};

export default Test