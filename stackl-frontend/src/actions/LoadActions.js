import {SET_IS_LOADING} from './ActionTypes';

export const startLoad = () => {
    return {
        type: SET_IS_LOADING,
        payload: true,
    }
};

export const endLoad = () => {
    return {
        type: SET_IS_LOADING,
        payload: false,
    }
};
