import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// GetrCurrent User's Profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
        // dispatch(getCurrentProfile());
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or Update Profile
export const createProfile =
    (formData, edit = false) =>
    async (dispatch) => {
        try {
            const res = await axios.post('/api/profile', formData);
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    edit ? 'Profile Updated' : 'Profile Credate',
                    'success'
                )
            );
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'));
                });
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };
