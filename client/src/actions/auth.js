import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOADED_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    DO_LOGOUT,
    CLEAR_PROFILE
} from './types';

// TEMPORAL ERROR RESPONSES

/**
 * @desc loads user with token from localStorage & then takes a response from request
 */

export const loadUser = () => async (dispatch) => {
    const { token } = localStorage;

    if (token) {
        // put token to header
        setAuthToken(token);
    }

    try {
        // get res from /api/auth
        const res = await axios.get('/api/auth');
        dispatch({ type: LOADED_USER, payload: res.data });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'AUTH_ERROR :(',
                status: err.response.status,
            }
        });
    }
};

/**
 * @desc register user getting name, email, password, city & birth 
 */

export const register = ({ name, email, password, city, birth }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ name, email, password, city, birth });

    try {
        // create user with body params and config
        const res = await axios.post('/api/users', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

        // loads user with token
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'REGISTER_FAIL :(',
                status: err.response.status,
            }
        });
    }
};

/**
 * @desc login user with email & password from body
 */

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        // login user with body params and config
        const res = await axios.post('/api/users', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        // loads user with token
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'LOGIN_FAIL :(',
                status: err.response.status,
            }
        });
    }
};

/**
 * @desc multiple action for logout & clear profile
 */

export const logout = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: DO_LOGOUT
    });
};
