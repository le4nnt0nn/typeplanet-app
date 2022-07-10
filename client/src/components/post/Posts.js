import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from '../post/PostCard';
import { getAllPosts } from '../../actions/post';
import NavbarRoot from '../setup/Navbar';
import PostMaker from './PostMaker';

import { FaFilter } from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap';

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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // filter function for pop up
    function filterOn(f) {
        if (f === 'front') {
            setFilter('front')
            handleClose()
        }
        if (f === 'back') {
            setFilter('back')
            handleClose()
        }
        if (f === '') {
            setFilter('')
            handleClose()
        }
    }

    return (
        <>
            <body>
                <NavbarRoot />
                <div>
                    <PostMaker />
                    <div className="filter mx-auto text-center">
                    <span className="btn-password btn" onClick={handleShow}><FaFilter/></span>
                    </div>
                </div>
                <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        className="modal-filter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Time to filter!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Choose from these categories
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn text-center mx-auto btn-filter btn-front border-0" onClick={() => filterOn('front')}>
                            Show Front 👁️
                            </Button>
                            <Button className="btn text-center mx-auto btn-filter btn-back border-0" onClick={() => filterOn('back')}>
                            Show Back 🧠
                            </Button>
                            <Button className="btn text-center mx-auto btn-filter btn-all border-0" onClick={() => filterOn('')}>
                            All 🌌
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
                        <div>
                            <h2 className="no-found-text text-center">Ooops, there is no posts here :( </h2>
                        </div>
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