import {START_LOAD, END_LOAD} from './ActionTypes';

export const startLoad = () => {
    return {
        type: START_LOAD,
        payload: null,
    }
};

export const endLoad = () => {
    return {
        type: END_LOAD,
        payload: null,
    }
};
