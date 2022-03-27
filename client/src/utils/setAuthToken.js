import axios from 'axios';

/**
 * @desc Function that takes a token (if exists) & add it to header. If not exists, then remove it from header
 */

const setAuthToken = (token) => {
    if (token) {
        // add token to header
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // remove token from header
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

module.exports = {
    setAuthToken
}