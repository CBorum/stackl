import {GET_SAVED_POSTS, GET_SAVED_POSTS_DONE} from "./ActionTypes";
import * as ActionTypes from "./ActionTypes";



export const getSavedPosts = () => {
    return {
        type: ActionTypes.GET_SAVED_POSTS_DONE,
        payload: null,
    }
};

export const getSavedPostsDone = savedPosts => {
    return {
        type: ActionTypes.GET_POSTS_DONE,
        payload: savedPosts,
    }
};