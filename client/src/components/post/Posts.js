import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from '../post/PostCard';
import { getAllPosts } from '../../actions/post';
import NavbarRoot from '../setup/Navbar';
import PostMaker from './PostMaker';

import { FaBrain, FaEye, FaFilter } from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap';

// sound for search input
import useSound from 'use-sound';
import searchSound from '../../sounds/searchSound.mp3';

const Posts = ({ getAllPosts, post: { posts } }) => {


    // filter for posts
    let [filter, setFilter] = useState('');

    // get found posts by search
    const [foundPosts, setFoundPosts] = useState(posts);

    // the value of the search field 
    const [name, setName] = useState('');

    // handle actions for pop up
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // declare search input sound
    const [play] = useSound(searchSound);

    const searchPost = (e) => {
        const keyword = e.target.value;
        // play type sound
        play()
        if (keyword !== '') {
            const results = posts.filter((post) => {
                return post.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundPosts(results);
        } else {
            setFoundPosts(posts);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };

    // unmount component for cleanup
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getAllPosts();
            }
        }, 1000)
    }, [getAllPosts]);

    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                setFoundPosts(posts);
            }
        }, 2000)
    }, [setFoundPosts, posts]);

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
                        <span className="btn-password btn" onClick={handleShow}>{filter==='front' ? (<FaEye/>) : (<span>{filter==='back' ? (<FaBrain/>) : (<FaFilter/>)}</span>)}</span>
                        <input
                        type="search"
                        value={name}
                        onChange={searchPost}
                        className="search-user-input m-2 p-2"
                        placeholder="Search posts by dev"
                    />
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
                    {foundPosts.length && posts.length > 0 ? (
                        <div>
                            {filter === 'front' ? (
                                <div>
                                    {
                                        foundPosts.filter(post =>
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
                                                foundPosts.filter(post =>
                                                    post.categories.includes('Java')
                                                    || post.categories.includes('C#')).map(postsFiltered => (
                                                        <li>
                                                            <PostCard key={postsFiltered._id} post={postsFiltered} />
                                                        </li>
                                                    ))
                                            }
                                        </div>
                                    ) : (
                                        foundPosts.map((post) => (
                                            <PostCard key={post._id} post={post} />
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mx-auto text-center mb-5">
                            <h2 className="no-found-text text-center">Ooops, there is no posts here :( </h2>
                            <img className="astro astro-ups" src="astroUps.png" alt="AstroUps"></img>
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