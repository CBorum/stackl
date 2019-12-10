import * as ActionTypes from './ActionTypes';

export const getSearchHistory = userId => {
    return {
        type: ActionTypes.GET_SEARCH_HISTORY,
        payload: userId,
    }
};

export const getSearchHistoryDone = searchHistory => {
    return {
        type: ActionTypes.GET_SEARCH_HISTORY_DONE,
        payload: searchHistory,
    }
};