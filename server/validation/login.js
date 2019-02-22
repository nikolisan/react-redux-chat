const Validator = require('validator');
const isEmpty = require('./isEmpty');

function validateLoginInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = 'Password must have at least 8 characters';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;