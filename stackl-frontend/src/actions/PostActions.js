import * as ActionTypes from './ActionTypes';

export const getPosts = (query, userId) => {
    return {
        type: ActionTypes.GET_POSTS,
        payload: {
            query: query,
            userId: userId
        }
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

export const getSinglePostDone = res => {
    return {
        type: ActionTypes.GET_SINGLE_POST_DONE,
        payload: res,
    }
}

export const resetPosts = () => {
    return {
      type: ActionTypes.RESET_POSTS,
      payload: []
    }
}