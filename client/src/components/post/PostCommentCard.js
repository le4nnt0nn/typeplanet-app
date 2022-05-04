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
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/devs/dev/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on
                    {' ' + moment(date).format("DD/MM/YYYY")}
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        className="btn btn-danger"
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