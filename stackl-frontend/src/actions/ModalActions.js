import {SHOW_MODAL, HIDE_CURRENT_MODAL, HIDE_MODAL} from './ActionTypes';

export const showModal = modalId => {
    console.log(`showModal(${modalId})`)
    return {
        type: SHOW_MODAL,
        payload: modalId,
    }
};

// export const showModal = (modalId) => ({
//     type: SHOW_MODAL,
//     payload: modalId,
// });

export const hideCurrentModal = () => ({
    type: HIDE_CURRENT_MODAL,
    payload: null
});

export const hideModal = modalId => ({
    type: HIDE_MODAL,
    payload: modalId
});

export const MODAL_IDS = {
    LOGIN: 'login',
    REGISTER: 'register'
};