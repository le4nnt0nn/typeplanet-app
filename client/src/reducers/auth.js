import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOADED_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    DO_LOGOUT,
    CLEAR_PROFILE
} from '../actions/types';

/**
 * @prop token from localStorage
 * @prop isAuth checks if user is logged or not
 * @prop user gets current
 */

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    user: null,
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOADED_USER:
            return {
                ...state,
                isAuth: true,
                user: payload,
            };
        case REGISTER_SUCCESS:
        // nothing
        case REGISTER_FAIL:
        // nothing
        case LOGIN_SUCCESS:
            // set token
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuth: true,
            };
        case LOGIN_FAIL:
        // nothing
        case AUTH_ERROR:
        // nothing
        case DO_LOGOUT:
        // nothing
        case CLEAR_PROFILE:
            // remove token
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
            };
        default:
            return state;
    }
}

export default authReducer;