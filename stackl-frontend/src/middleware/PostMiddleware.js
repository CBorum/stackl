import * as ActionTypes from '../actions/ActionTypes'
import { getPostsDone, getSinglePostDone } from '../actions/PostActions'
import { apiCall } from './apiService'

const PostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    switch (action.type) {
        case ActionTypes.GET_POSTS:
            let aPI_UII = `api/search?offset=${action.payload.query.offset}&limit=${action.payload.query.limit}&input=${action.payload.query.input}`

            apiCall(dispatch, aPI_UII, 'GET')
                .then(res => {
                    if (action.payload.query.offset > 0) {
                        let posts = getState()["Posts"]["posts"]
                        const catPosts = posts.concat(res)
                        dispatch(getPostsDone(catPosts))
                    } else {
                        dispatch(getPostsDone(res))
                    }
                })
                .catch(e => {
                    console.log("error: " + e)
                })
            break
        case ActionTypes.GET_SINGLE_POST:
            apiCall(dispatch, `api/post/${action.payload}`, 'GET')
                .then(res => {
                    dispatch(getSinglePostDone(res))
                })
                .catch(e => {
                    console.log("error: " + e)
                })
            break
        default:
            break
    }
}

export default PostMiddleware