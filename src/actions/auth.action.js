import axios from "axios"
import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
    console.log(user)

    return async (dispatch) => {

        dispatch({type: authConstants.LOGIN_REQUEST})
        const res = await axiosInstance.post(`/signin`, {
            ...user
        });
        if (res.status === 200) {
            const { token, date } = res.data;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
                
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
                
            })
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }
    }
}


// if (token) {
//     dispatch({ payload: { token } });
// } else {
//     dispatch({ payload: { authenticate: false, message: 'user not logged in' } });
// }

export const Signout = () => {
    return async dispatch => {

        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
        const res = await axiosInstance.post(`/signout`);

        if (res.status === 200) {
            localStorage.clear()
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}