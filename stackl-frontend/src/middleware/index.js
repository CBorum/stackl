import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'
import PostMiddleware from './PostMiddleware'
import LoginMiddleware from './LoginMiddleware'
import RegisterMiddleware from './RegisterMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
    PostMiddleware,
    LoginMiddleware,
    RegisterMiddleware
);

export default middleware