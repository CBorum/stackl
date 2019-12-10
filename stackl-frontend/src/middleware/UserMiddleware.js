import * as ActionTypes from '../actions/ActionTypes'
import { getSearchHistoryDone } from '../actions/UserActions'
import { apiCall } from './apiService'

const UserMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    switch (action.type) {
        case ActionTypes.GET_SEARCH_HISTORY:
            apiCall(dispatch, `api/user/${action.payload}/searchhistory`, 'GET')
                .then(res => {
                    dispatch(getSearchHistoryDone(res))
                })
                .catch(e => {
                    console.log("error: " + e)
                })
            break
        default:
            break
    }
}

export default UserMiddleware