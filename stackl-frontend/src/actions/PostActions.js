import * as ActionTypes from './ActionTypes';

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

export const getSinglePost = postId => {
    return {
        type: ActionTypes.GET_SINGLE_POST,
        payload: postId,
    }
}

export const getSinglePostDone = postId => {
    return {
        type: ActionTypes.GET_SINGLE_POST_DONE,
        payload: postId,
    }
}

export const resetPosts = () => {
    return {
      type: ActionTypes.RESET_POSTS,
      payload: []
    }
}