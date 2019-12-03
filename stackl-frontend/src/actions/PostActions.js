import * as ActionTypes from './ActionTypes';

export const setPosts = posts => {
    return {
        type: "SET_POSTS",
        payload: posts,
    }
};

export const getPosts = queryStr => {
    return {
        type: ActionTypes.GET_POSTS,
        payload: queryStr,
    }
}

export const getPostsDone = res => {
    return {
        type: ActionTypes.GET_POSTS_DONE,
        payload: res,
    }
}