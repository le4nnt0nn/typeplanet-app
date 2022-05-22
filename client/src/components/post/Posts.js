import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from '../post/PostCard';
import { getAllPosts } from '../../actions/post';
import NavbarRoot from '../setup/Navbar';
import PostMaker from './PostMaker';

const Posts = ({ getAllPosts, post: { posts } }) => {

    // filter for posts
    let [filter, setFilter] = useState('');

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
                    <div className="filter mx-auto text-center">
                        <button className="btn text-center mx-auto btn-filter btn-front" onClick={() => setFilter('front')}>Show Front 👁️</button>
                        <button className="btn text-center mx-auto btn-filter btn-back" onClick={() => setFilter('back')}>Show Back 🧠</button>
                        <button className="btn text-center mx-auto btn-filter btn-all" onClick={() => setFilter('')}>All 🌌</button>
                    </div>
                </div>
                <div>
                    {posts && posts.length > 0 ? (
                        <div>
                            {filter === 'front' ? (
                                <div>
                                    {
                                        posts.filter(post =>
                                            post.categories.includes('Angular')
                                            || post.categories.includes('React')
                                            || post.categories.includes('JS')).map(postsFiltered => (
                                                <li>
                                                    <PostCard key={postsFiltered._id} post={postsFiltered} />
                                                </li>
                                            ))
                                    }
                                </div>
                            ) : (
                                <div>
                                    {filter === 'back' ? (
                                        <div>
                                            {
                                                posts.filter(post =>
                                                    post.categories.includes('Java')
                                                    || post.categories.includes('C#')).map(postsFiltered => (
                                                        <li>
                                                            <PostCard key={postsFiltered._id} post={postsFiltered} />
                                                        </li>
                                                    ))
                                            }
                                        </div>
                                    ) : (
                                        posts.map((post) => (
                                            <PostCard key={post._id} post={post} />
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <h2 className="text-center">Ooops, there is no posts here :( </h2>
                    )}
                </div>
            </body>
        </>
    );
};

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);