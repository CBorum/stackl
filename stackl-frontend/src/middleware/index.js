import { applyMiddleware } from 'redux'
import TestMiddleware from './TestMiddleware'
import PostMiddleware from './PostMiddleware'
import LoginMiddleware from './LoginMiddleware'
import RegisterMiddleware from './RegisterMiddleware'
import UserMiddleware from './UserMiddleware'
import SavedPostMiddleware from './SavedPostMiddleware'
import WordCloudMiddleware from './WordCloudMiddleware'

const middleware = applyMiddleware(
    TestMiddleware,
    PostMiddleware,
    LoginMiddleware,
    RegisterMiddleware,
    UserMiddleware,
    SavedPostMiddleware,
    WordCloudMiddleware
);

export default middleware