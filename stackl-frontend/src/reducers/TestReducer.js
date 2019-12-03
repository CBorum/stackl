import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    test: ""
}

const Test = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.TEST_DONE:
            return Object.assign({}, state, { test: action.payload })
        default:
            return state
    }
}

export default Test