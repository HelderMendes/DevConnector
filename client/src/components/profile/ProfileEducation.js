import React from 'react';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';

const ProfileEducation = ({
    education: {
        school,
        degree,
        fieldofstudy,
        startDate,
        to,
        // currente,
        description,
    },
}) => {
    return (
        <div>
            <h3 className="text-dark">{school} </h3>
            <p>
                <strong>Degree:</strong> {degree}
            </p>
            <p>
                <strong>Field of Study:</strong> {fieldofstudy}
            </p>

            <p>
                {formatDate(startDate)}
                {' – '}
                {!to ? 'Still learning now' : formatDate(to)}
            </p>
            <p>
                <strong>Description:</strong> {description}
            </p>
        </div>
    );
};

ProfileEducation.propTypes = {
    Education: PropTypes.array.isRequired,
};

export default ProfileEducation;
