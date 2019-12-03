
const MODAL_IDS = {
    LOGIN: 'login',
    REGISTER: 'register'
};

const showModal = modalId => {
    console.log(`showModal(${modalId})`);
    // this should probably be a reducer function
    // it should attempt to set the value of "shownModalId" to the provided modalId, unless
    // "shownModalId" already has a defined value
};

const hideCurrent = () => {
    console.log('hideCurrent()')
    // sets "shownModalId" to undefined
};

module.exports = {
    showModal,
    hideCurrent,
    MODAL_IDS
};
