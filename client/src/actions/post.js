import axios from 'axios';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// toastify
import { success, error } from '../utils/toasts';

/**
* @desc Get all posts using /api/posts 
*/

export const getAllPosts = () => async (dispatch) => {
    try {
        // get response from request
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_POSTS Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Get post
*/

export const getPost = (id) => async (dispatch) => {
    try {
        // get post from response
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'GET_POST Error :( where Post ID is: ' + id,
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Put like to post
*/

export const addLike = (id) => async (dispatch) => {
    try {
        // put post wich will be liked
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'UPDATE_LIKES Error :( -> (addLike) ' + (id && id),
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Remove like from post
*/

export const removeLike = (id) => async (dispatch) => {
    try {
        // put post wich will be unliked
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'UPDATE_LIKES Error :( -> (removeLike)',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Delete post
*/

export const deletePost = (id) => async (dispatch) => {
    try {
        // remove selected post 
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'DELETE_POST Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Create post
*/

export const addNewPost = (formData) => async (dispatch) => {

    // config for axios request
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        // create post with received formData
        const res = await axios.post('/api/posts/', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'ADD_POST Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Add comment to post
*/

export const addComment = (postId, formData) => async (dispatch) => {

    // config for axios request
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        // create post comment with received formData
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'ADD_COMMENT Error :(',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Remove comment for post
*/

export const removeComment = (postId, commentId) => async (dispatch) => {
    try {
        // remvoe post comment with received formData
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'REMOVE_COMMENT Error :(',
                status: err.response.status,
            }
        });
    }
};