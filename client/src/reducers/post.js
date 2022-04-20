import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

/**
 * @prop posts is an array for posts
 * @prop post is the current post
 * @prop error hold any error in request
 */

const initialState = {
    posts: [],
    post: null,
    error: {}
}

function postReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        (comment) => comment._id !== payload
                    ),
                },
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
            };
        default:
            return state;
    }
}

export default postReducer;
