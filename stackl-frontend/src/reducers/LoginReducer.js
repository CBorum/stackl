import { LOGIN_DONE, LOGOUT } from '../actions/ActionTypes'

const defaultState = {
    token: undefined
};

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_DONE:
        {
            const {token, username, id} = action.payload;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('id', id);

            return Object.assign({}, state, {
                token: token,
                username: username,
                userId: id
            });
        }

        case LOGOUT:
            localStorage.clear();
            return Object.assign({}, state, {
                token: null,
                username: null,
                userId: null
            });
        default:
            return state
    }
};

export default Login