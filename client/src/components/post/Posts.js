import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from '../post/PostCard';
import { getAllPosts } from '../../actions/post';
import NavbarRoot from '../setup/Navbar';
import PostMaker from './PostMaker';

const Posts = ({ getAllPosts, post: { posts } }) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);


    return (
        <>
            <body>
                <NavbarRoot />
                <div>
                    <PostMaker />
                </div>
                <div>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <h2>Ooops, there is no posts here :( </h2>
                    )}
                </div>
            </body>
        </>
    )
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);