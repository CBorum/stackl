import {GET_WORD_CLOUD} from '../actions/ActionTypes'
import { getWordCloudDone } from '../actions/WordCloudActions'
import { apiCall } from './apiService'

const WordCloudMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    switch (action.type) {
        case GET_WORD_CLOUD:
            let aPI_UII = `api/search/wc?input=${action.payload}`
            apiCall(dispatch, aPI_UII, 'GET')
                .then(res => {
                      dispatch(getWordCloudDone(res))
                    })
                .catch(e => {
                    console.log("error: " + e)
                })
            break
        default:
            break
    }
}

export default WordCloudMiddleware