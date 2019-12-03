import {SET_POSTS} from './ActionTypes';

export const setPosts = posts => {
    return {
        type: "SET_POSTS",
        payload: posts,
    }
};