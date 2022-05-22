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

// toastify
import { success, error } from '../utils/toasts';

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
            type: AUTH_ERROR
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
        const res = await axios.post('/api/users/register', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        success('Welcome to our planet! 🪐');

        // loads user with token
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
        error('Something went wrong 👽');
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
        const res = await axios.post('/api/auth', body, config);
        success('Now you are logged pal! 🚀');
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        
        // loads user with token
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        error('Invalid credentials 👽');
    }
};

/**
 * @desc multiple action for logout & clear profile
 */

export const logout = () => async (dispatch) => {
    success('We will miss you! 🌠');
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: DO_LOGOUT
    });
};
