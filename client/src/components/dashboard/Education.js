import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td className="hide-sm">{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td className="hide-sm">
                {formatDate(edu.startDate)} -{' '}
                {edu.to ? formatDate(edu.to) : ' Still Ongoing Study!'}
            </td>
            <td className="hide-sm">{edu.description}</td>
            <td>
                <button
                    onClick={() => deleteEducation(edu._id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">School</th>
                        <th>Degree/Certificate</th>
                        <th>Field of Study</th>
                        <th className="hide-sm">Years</th>
                        <th className="hide-sm">Description</th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
