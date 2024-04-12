import axios from 'axios';
// import { setAlert } from './alert';

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
