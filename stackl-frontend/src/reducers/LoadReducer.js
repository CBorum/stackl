import * as ActionTypes from '../actions/ActionTypes'

const defaultState = {
    isLoading: false,
    loadingCount: 0
};

const Load = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.START_LOAD:
        {
            const loadingCount = state.loadingCount + 1;
            const isLoading = loadingCount > 0;
            return Object.assign({}, state, {
                loadingCount,
                isLoading
            });
        }

        case ActionTypes.END_LOAD:
        {
            const loadingCount = state.loadingCount - 1;
            const isLoading = loadingCount > 0;
            return Object.assign({}, state, {
                loadingCount,
                isLoading
            });
        }
        default:
            return state
    }
};

export default Load