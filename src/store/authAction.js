import axios from 'axios';
import Profile from '../models/profile';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const FETCH_PROFILE = 'FETCH_PROFILE';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {  
            dispatch(logout());
        },expirationTime * 1000)
    };
};

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXrWD5TwF-c3usyxE48BRhV7rj9FCSFtU';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXrWD5TwF-c3usyxE48BRhV7rj9FCSFtU';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const passwordReset = (email) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXrWD5TwF-c3usyxE48BRhV7rj9FCSFtU',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    requestType: 'PASSWORD_RESET'
                })
            });
        if (!response.ok) {
            const errorResData = await response.json();
            console.log(JSON.stringify(errorResData));
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
                alert('Email not found.Kindly give already registered e-mail!');
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Password entered is wrong!';
            }   
            // throw new Error(message);
            return;
        }
        const resData = await response.json();
        alert('A reset link is send to your E-mail id!');
        console.log("Password Reset data:" + JSON.stringify(resData));
        dispatch({ type: PASSWORD_RESET, email: email });
    };
};

export const fetchProfile = () => {
    return async (dispatch, getState) => {
        console.log(localStorage.getItem('userId'));
        console.log(localStorage.getItem('token'));
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(
                `https://crpapp-default-rtdb.firebaseio.com/register.json?orderBy="userId"&equalTo="${userId}"&auth=${token}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();
            console.log("Fetch Data for Profile:" + JSON.stringify(resData));
            const loadedProfile = [];

            for (const key in resData) {
                loadedProfile.push(new Profile(
                    key,
                    resData[key].firstName,
                    resData[key].lastName,
                    resData[key].phone,
                    resData[key].dob,
                    userId
                )
                );
            }
            dispatch({ type: FETCH_PROFILE, fetchProfile: loadedProfile });
        } catch (err) {
            throw err;
        }
    };
};
