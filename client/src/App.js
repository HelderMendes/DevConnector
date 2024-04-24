import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        // // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute component={Dashboard} />}
                    />
                    <Route
                        path="create-profile"
                        element={<PrivateRoute component={ProfileForm} />}
                    />
                    <Route
                        path="edit-profile"
                        element={<PrivateRoute component={ProfileForm} />}
                    />
                    <Route
                        path="add-experience"
                        element={<PrivateRoute component={AddExperience} />}
                    />
                    <Route
                        path="add-education"
                        element={<PrivateRoute component={AddEducation} />}
                    />
                    <Route
                        path="posts"
                        element={<PrivateRoute component={Posts} />}
                    />
                    <Route
                        path="posts/:id"
                        element={<PrivateRoute component={Post} />}
                    />
                </Routes>
            </Router>
        </Provider>
    );
};
export default App;
