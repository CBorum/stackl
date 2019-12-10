import { GET_WORD_CLOUD_DONE } from '../actions/ActionTypes'

const defaultState = {
    words: null,
};

const Words = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WORD_CLOUD_DONE:
            return Object.assign({}, state, { words: action.payload })
        default:
            return state
    }
};

export default Words