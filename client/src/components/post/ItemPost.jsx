import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
    addLike,
    removeLike,
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="" />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{text}</p>
            <p className="post-date">Posted on {formatDate(date)}</p>
        </div>
    </div>
);

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, {
    addLike,
    removeLike,
})(PostItem);
