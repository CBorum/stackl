import {HIDE_CURRENT_MODAL, SHOW_MODAL} from '../actions/ActionTypes'

const defaultState = {
    currentModalId: undefined
};

const Modal = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
        {
            return Object.assign({}, state, {
                currentModalId: action.payload // works so far, store is updated
            });
        }
        case HIDE_CURRENT_MODAL:
        {
            return Object.assign({}, state, {
                currentModalId: undefined
            });
        }
        default:
            return state
    }
};

export default Modal