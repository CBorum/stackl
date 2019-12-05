import { LOGIN_DONE, LOGOUT } from '../actions/ActionTypes'

const defaultState = {
    token: undefined
};

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_DONE:
            return Object.assign({}, state, { token: action.payload.token });
        case LOGOUT:
            return Object.assign({}, state, { token: undefined });
        default:
            return state
    }
};

export default Login