import * as ActionTypes from '../actions/ActionTypes'
import { getPostsDone } from '../actions/PostActions'
import { apiCall } from './helper'

const PostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    switch (action.type) {
        case ActionTypes.GET_POSTS:
                apiCall(dispatch, `api/search?userid=1&offset=0&limit=10&input=${action.payload}`, 'GET')
                    .then(res => {
                        dispatch(getPostsDone(res))
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