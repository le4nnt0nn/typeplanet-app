export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';
//export const GET_REPOS = 'GET_REPOS';

// TODO - GITHUB REPOS

/**
 * @prop profile get all profile data
 * @prop profiles it's an Array of profiles
 * @prop error hold any error in request
 */

const initialState = {
    profile: null,
    profiles: [],
    //repos: [],
    error: {},
};

function profileReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                profile: null,
            };
        case ACCOUNT_DELETE:
            return {
                ...state,
                profile: null,
            };
        default:
            return state;
    }
}

export default profileReducer;