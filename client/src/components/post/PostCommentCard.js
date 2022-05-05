import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import { Link } from 'react-router-dom';

import moment from 'moment';

// icons
import { FaTrash } from 'react-icons/fa';

const PostCommentCard = ({
    removeComment,
    comment: { _id, text, name, avatar, user, date },
    postId,
    auth,
}) => (
    <>
        <div className="post-comment-card bg-white rounded p-1 my-5">
            <div>
                <Link to={`/devs/dev/${user}`} style={{ textDecoration: 'none' }}>
                    <img className="comment-avatar rounded-circle mt-2" src={avatar} alt="" />
                    <h4 className="comment-username mt-3">{name}</h4>
                </Link>
            </div>
            <div>
                <p className="comment-text">{text}</p>
                <p className="comment-date">
                    Posted on
                    {' ' + moment(date).format("DD/MM/YYYY")}
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        className="btn btn-danger mb-2"
                        onClick={(e) => {
                            removeComment(postId, _id);
                        }}
                    >
                        <FaTrash />
                    </button>
                )}
            </div>
        </div>
    </>
);

PostCommentCard.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(PostCommentCard);