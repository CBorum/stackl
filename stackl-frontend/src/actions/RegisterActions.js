import {REGISTER, REGISTER_DONE} from './ActionTypes';

export const register = (username, password) => {
    return {
        type: REGISTER,
        payload: {
            username, password
        },
    }
};

// export const registerDone = ({username, password}) => {
//     return {
//         type: REGISTER_DONE,
//         payload: {
//             username, password
//         },
//     }
// };