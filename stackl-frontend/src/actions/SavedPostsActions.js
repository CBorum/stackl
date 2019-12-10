import {GET_SAVED_POSTS, GET_SAVED_POSTS_DONE, SAVE_POST, SAVE_POST_DONE} from "./ActionTypes";



export const getSavedPosts = () => {
    return {
        type: GET_SAVED_POSTS,
        payload: null,
    }
};

export const getSavedPostsDone = savedPosts => {
    return {
        type: GET_SAVED_POSTS_DONE,
        payload: savedPosts,
    }
};

export const savePost = ({postId, note}) => {
    return {
        type: SAVE_POST,
        payload: {
            postId,
            note
        },
    }
};

export const savePostDone = (savedPost) => ({
    type: SAVE_POST_DONE,
    payload: savedPost
});