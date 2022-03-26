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

/**
* @desc Get all posts using /api/posts 
*/

const getAllPosts = () => async (dispatch) => {
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

const getPost = (id) => async (dispatch) => {
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

const addLike = (id) => async (dispatch) => {
    try {
        // put post wich will be liked
        const res = axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                // text & status from err response
                msg: err.response.statusText + 'UPDATE_LIKES Error :( -> (addLike)',
                status: err.response.status,
            }
        });
    }
};

/**
* @desc Remove like from post
*/

const removeLike = (id) => async (dispatch) => {
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

module.exports = {
    getAllPosts,
    getPost,
    addLike,
    removeLike,
}