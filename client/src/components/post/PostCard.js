import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

import moment from 'moment';

import './style.css';

const PostCard = ({
    addLike,
    removeLike,
    deletePost,
    post: { _id, text, user, name, avatar, likes, comments, categories, date },
    auth,
    showActions,
}) => {
    console.log(categories.includes('Question') ? 'active' : '')
    return (
        <>
            <div className="post-card bg-white rounded mt-5 mb-5">
                <div className="right-side float-end">
                    <div className={`someClass ${categories.includes('Question') ? 'active' : ''} ${categories.includes('Angular') ? 'someClass' : 'otherClass'}`}>
                        {categories.join(' ')}
                    </div>
                </div>
                <div className="left-side float-start">
                    <Link to={`/devs/dev/${user}`} style={{ textDecoration: 'none' }}>
                        <img className="rounded-circle w-50" src={avatar} alt='' />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div className="center-side">
                    <p className="post-content">{text}</p>
                    <p className="date">{moment(date).format('MM/DD/YYYY')}</p>
                    <p>{likes.length}</p>
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