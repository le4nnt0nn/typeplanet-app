import axios from 'axios';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    PUT_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

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
}