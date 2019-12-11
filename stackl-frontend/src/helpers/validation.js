const doDebug = true;
const debug = (...args) => doDebug && console.log('validation.js: ', ...args);

const isError = x => x !== null && typeof x === 'object' && x.constructor.name.includes('Error');

const invalidClass = 'is-invalid';
const validatedClass = 'is-valid';

export const usernameValidator = value => {
    if(!value || value.length < 4) return new Error('Your username must be at least 4 characters');
};

export const passwordValidator = value => {
    if(!value || value.length < 6) return new Error('Your password must be at least 6 characters');
};