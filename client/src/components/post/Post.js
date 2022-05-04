import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostCommentArea from './PostCommentArea';
import PostCommentCard from './PostCommentCard';

const Post = ({ getPost, post: { post } }) => {

    // params
    const { id } = useParams();

    useEffect(() => {
        getPost(id);
    }, [getPost, id]);

    return (
        <>
            <div className="back-button">
                <Link to="/posts" className="back btn">
                    Back
                </Link>
            </div>
            <PostCard post={post} showActions={false} />
            <PostCommentArea postId={post._id} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <PostCommentCard
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </>
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