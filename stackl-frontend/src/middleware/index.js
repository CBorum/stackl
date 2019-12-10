import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'
import PostMiddleware from './PostMiddleware'
import LoginMiddleware from './LoginMiddleware'
import RegisterMiddleware from './RegisterMiddleware'
import UserMiddleware from './UserMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
    PostMiddleware,
    LoginMiddleware,
    RegisterMiddleware,
    UserMiddleware
);

export default middleware