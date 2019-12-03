import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'
import PostMiddleware from './PostMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
    PostMiddleware,
)

export default middleware