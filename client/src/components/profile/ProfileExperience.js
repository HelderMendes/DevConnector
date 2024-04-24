import React from 'react';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';

const ProfileExperience = ({
    experience: {
        company,
        title,
        location,
        currente,
        to,
        startDate,
        description,
    },
}) => {
    return (
        <div>
            <h3 class="text-dark">{company} </h3>
            <p>
                {formatDate(startDate)}
                {' – '}
                {!to ? 'Present Day' : formatDate(to)}
            </p>
            <p>
                <strong>Position:</strong> {title}
            </p>
            <p>
                <strong>Description:</strong> {description}
            </p>
        </div>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
