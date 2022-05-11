import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETE,
    //GET_REPOS
} from './types';

// toastify
import { success, error } from '../utils/toasts';

/**
* @desc Get current user profile 
*/

export const getCurrentProfile = () => async (dispatch) => {
    try {
        // get current profile
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_PROFILE Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Get all profiles
*/

export const getAllProfiles = () => async (dispatch) => {

    try {
        // get profiles from res
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_PROFILES Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Get profile by user id
*/

export const getProfileById = (userId) => async (dispatch) => {
    try {
        // get user profile
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_PROFILE Error :(',
                status: err.response.status,
            }
        });
    }
}

/**
* @desc Get users github repos
*/

// TODO getGitHubRepos

/**
* @desc Create or update profile with redirect
* @param formData submit
* @param edit if is true, update profile
*/

export const createProfile = (formData, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // create profile with post
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        if (!edit) {
            // TODO - REDIRECT TO PROFILE
        }

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_PROFILE Error :( -> Create or update profile',
                status: err.response.status,
            }
        });
    }
}

/**
* @desc Remove a profile
*/

export const removeProfile = () => async (dispatch) => {

    if (window.confirm('You are going to delete your profile, are you sure about that? :(')) {
        try {
            // delete current profile
            await axios.delete('/api/profile');

            dispatch({
                type: CLEAR_PROFILE,
            });

            dispatch({
                type: ACCOUNT_DELETE,
            });
            success('Profile removed... see you soon 🌠');

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    // text & status from err response
                    msg: err.response.statusText + 'GET_PROFILE Error :( -> Create or update profile',
                    status: err.response.status,
                }
            });
            error('Something went wrong 👽');
        }
    }
}