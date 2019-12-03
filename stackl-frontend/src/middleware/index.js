import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
)

export default middleware