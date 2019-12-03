import {POST_SEARCH, POST_SEARCH_DONE} from './ActionTypes';

export const startLoad = () => {
    return {
        type: "SET_IS_LOADING",
        payload: true,
    }
};

export const endLoad = () => {
    return {
        type: "SET_IS_LOADING",
        payload: false,
    }
};
