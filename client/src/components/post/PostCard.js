import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

import useSound from 'use-sound';
// sounds
import likeSound from '../../sounds/likeSound.mp3';

import moment from 'moment';

// icons
import { FaMoon, FaCloudMoon, FaUserAstronaut, FaRegTimesCircle } from 'react-icons/fa';

import './style.css';

const PostCard = ({
    addLike,
    removeLike,
    deletePost,
    post: { _id, text, user, name, avatar, likes, comments, categories, date },
    auth,
    showActions,
}) => {

    const [play] = useSound(likeSound);

    function like() {
        addLike(_id)
        play()
    }

    return (
        <>
            <div className="post-card card bg-white rounded mt-5 mb-5">
                <div className="content text-center">
                    <div className="categories mx-auto text-center">
                        {categories && categories.join(' ')}
                    </div>
                    <p className="post-content mt-5 mb-5">{text}</p>
                </div>
                <div className="actions mt-2 text-center justify-center mx-auto d-flex">
                    {showActions && (
                        <>

                            <span
                                className="like like-btn" role="button"
                                onClick={(e) => like()}
                            >
                                <p>{likes && likes.length > 0 && <span>{likes.length}</span>} <FaMoon /></p>
                            </span>

                            <span
                                className="nolike nolike-btn" role="button"
                                onClick={(e) => removeLike(_id)}
                            >
                                <FaCloudMoon />
                            </span>

                            <Link to={`/posts/${_id}`} style={{ textDecoration: 'none' }}>
                                <span className="comment comment-btn" role="button">
                                    {comments && comments.length > 0 && (
                                        <span className="comment-count">{comments.length}</span>
                                    )}
                                    <FaUserAstronaut className="mb-3"/>
                                </span>
                            </Link>

                            {!auth.loading && user === auth.user._id && (
                                <button
                                    onClick={(e) => deletePost(_id)}
                                    type="button"
                                    className="remove-btn text-center mb-3"
                                >
                                    <FaRegTimesCircle />
                                </button>
                            )}
                        </>
                    )}
                </div>
                <div className="social-side">
                    <div className="user-post text-center">
                        <Link to={`/devs/dev/${user}`} style={{ textDecoration: 'none' }}>
                            <img className="rounded-circle" src={avatar} alt='' />
                            <h4>{name}</h4>
                        </Link>
                    </div>
                    <p className="date text-center">{moment(date).format('DD/MM/YYYY')}</p>
                </div>
            </div>
        </>
    )
}

PostCard.defaultProps = {
    showActions: true,
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
    PostCard
);