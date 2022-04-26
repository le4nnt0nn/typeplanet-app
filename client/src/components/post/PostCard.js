import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

import moment from 'moment';

// icons
import { FaMoon, FaCloudMoon, FaUserAstronaut } from 'react-icons/fa';

import './style.css';

const PostCard = ({
    addLike,
    removeLike,
    deletePost,
    post: { _id, text, user, name, avatar, likes, comments, categories, date },
    auth,
    showActions,
}) => {
    return (
        <>
            <div className="post-card card bg-white rounded mt-5 mb-5">
                <div className="content text-center">
                    <div className="categories text-center">
                        {categories.join(' ')}
                    </div>
                    <p className="post-content mt-5 mb-5">{text}</p>
                </div>
                <div className="actions mt-2 text-center justify-center mx-auto d-flex">
                    <div className="like">
                        <p>{likes.length} <span className="like-btn" role="button"><FaMoon /></span></p>
                    </div>
                    <div className="nolike">
                        <span className="nolike-btn" role="button"><FaCloudMoon /></span>
                    </div>
                    <div className="comment">
                        <p>{comments.length}<span className="comment-btn" role="button"><FaUserAstronaut /></span></p>
                    </div>
                </div>
                {showActions && (
                    <>
                        {!auth.loading && user === auth.user._id && (
                            <button
                                onClick={(e) => deletePost(_id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                Remove
                            </button>
                        )}
                    </>
                )}
                <div className="social-side">
                    <div className="user-post text-center">
                        <Link to={`/devs/dev/${user}`} style={{ textDecoration: 'none' }}>
                            <img className="rounded-circle" src={avatar} alt='' />
                            <h4>{name}</h4>
                        </Link>
                    </div>
                    <p className="date text-center">{moment(date).format('MM/DD/YYYY')}</p>
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