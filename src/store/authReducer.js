import { AUTH_FAIL,AUTH_LOGOUT,AUTH_START,AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH, PASSWORD_RESET, FETCH_PROFILE } from './authAction';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    fetchProfile: {}
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            };
        case AUTH_FAIL: 
            return {
                ...state,
                error: action.error,
                loading: false
            }; 
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case SET_AUTH_REDIRECT_PATH: 
            return {
                ...state,
                authRedirectPath: action.path
            }
        case PASSWORD_RESET:
            return{
                email: action.email
            }
        case FETCH_PROFILE:
            return {
                fetchProfile: action.fetchProfile
            }
        default:
            return state;
    }
};

export default reducer;