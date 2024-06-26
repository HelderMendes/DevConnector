import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    // Render Spinner if loading is true
    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop" /> Browse and connect with
                developers
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : (
                    <h4>No Profiles Found</h4>
                )}
            </div>
        </section>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStatToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStatToProps, { getProfiles })(Profiles);
