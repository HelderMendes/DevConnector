import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Add like
export const addLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts//${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/posts', formData);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        dispatch(setAlert('One Post as been Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get post
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
        dispatch(setAlert('A Comment was added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId,
        });
        dispatch(setAlert('Comment deleted', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
