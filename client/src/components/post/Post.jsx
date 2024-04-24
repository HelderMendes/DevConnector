import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ItemPost from './ItemPost';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, showActions = false }) => {
    const { id } = useParams();

    useEffect(() => {
        getPost(id);
    }, [getPost, id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <section className="container">
            <ItemPost post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>

            <Link to="/posts" className="btn">
                Back to Posts
            </Link>
        </section>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
