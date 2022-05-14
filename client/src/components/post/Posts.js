import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from '../post/PostCard';
import { getAllPosts } from '../../actions/post';
import NavbarRoot from '../setup/Navbar';
import PostMaker from './PostMaker';

const Posts = ({ getAllPosts, post: { posts } }) => {

    // filter
    let [filter, setFilter] = useState(false);

    // unmount component for cleanup
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getAllPosts();
            }
        }, 1000)
    }, [getAllPosts]);

    return (
        <>
            <body>
                <NavbarRoot />
                <div>
                    <PostMaker />
                    <div className="mx-auto text-center m-5">
                        <button className="btn text-center mx-auto bg-warning" onClick={() => setFilter(true)}>Filter by Interest</button>
                        <button className="btn text-center mx-auto bg-warning" onClick={() => setFilter(false)}>All</button>
                    </div>
                </div>
                <div>
                    {posts && posts.length > 0 ? (
                        <div>
                            {filter === true ? (
                                // TODO - FILTER HERE
                                <h2>filtering...</h2>
                            ) : (
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            )}
                        </div>
                    ) : (
                        <h2 className="text-center">Ooops, there is no posts here :( </h2>
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