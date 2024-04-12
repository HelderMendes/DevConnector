import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
// import profile from '../../reducers/profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    // Accessing company and website from the loaded profile
    const isProfileEmpty =
        !profile || (profile && Object.keys(profile).length === 0);

    // Render Spinner if loading is true
    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>

            {!isProfileEmpty ? (
                <>
                    <h2>Has Profile</h2>
                    <div className="my-2">
                        <button className="btn btn-danger">
                            <i className="fas fa-user-minus" /> Delete My
                            Account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2>Has NOT Profile</h2>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/createProfile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            )}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
