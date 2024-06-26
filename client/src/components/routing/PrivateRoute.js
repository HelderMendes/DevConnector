import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated } }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;

    // if (loading) return <Spinner />;
    if (isAuthenticated) return <Component />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
