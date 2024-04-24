import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
}) => {
    return (
        // <section className="container">
        <div class="profile-about bg-light p-2">
            <h2 class="text-primary">{name.trim().split(' ')[0]} Biography</h2>
            <p>{bio && <span>{bio}</span>}</p>
            <div class="line"></div>
            <h2 class="text-primary">Skill Set</h2>
            <div class="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check" /> {skill}
                    </div>
                ))}
            </div>
        </div>
        //</section>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
