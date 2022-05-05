import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostCommentArea from './PostCommentArea';
import PostCommentCard from './PostCommentCard';

import axios from 'axios';

const Post = ({ getPost, post: { post } }) => {

    // params
    const { id } = useParams();

    // user post
    let [userPost, setUserPost] = useState('');

    // get current post
    async function getUserPost() {
        const res = await axios.get('/api/posts')
        let thisPost = '';
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]._id === id) {
                thisPost = res.data[i]
                return thisPost
            }
        }
        return null
    }

    // get post
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getUserPost().then(data => setUserPost(data))
            }
        }, 1000)
    }, [userPost]);

    // unmount component for cleanup
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getPost(id);
            }
        }, 1000)
    }, [getPost, id]);

    // store data in post
    post = userPost

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
                {post.comments?.map((comment) => (
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