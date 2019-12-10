import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'
import PostMiddleware from './PostMiddleware'
import LoginMiddleware from './LoginMiddleware'
import RegisterMiddleware from './RegisterMiddleware'
import SavedPostMiddleware from './SavedPostMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
    PostMiddleware,
    LoginMiddleware,
    RegisterMiddleware,
    SavedPostMiddleware
);

export default middleware