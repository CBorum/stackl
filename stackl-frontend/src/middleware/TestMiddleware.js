import * as ActionTypes from '../actions/ActionTypes'
import { testDone } from '../actions/TestActions'

const TestMiddleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    switch (action.type) {
        case ActionTypes.TEST:
            dispatch(testDone(action.payload))
            break
        default:
            break
    }
}

export default InfoApiMiddleware