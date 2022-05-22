import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

const ProfileCard = ({
    profile: {
        user: { _id, name, avatar, level, city, followers, following },
        description,
        topics
    },
}) => {

    return (
        <>
            <div className="profile-card bg-white rounded mt-5 mb-5">
                <img src={avatar} alt="avatar" className="avatar-profile-card rounded-circle" />
                <h2 className="name mt-3">{name} <span className="level">lvl {Math.round(level)}</span></h2>
                <p className="description">{description}</p>
                <p className="mb-1">📍 {city}</p>
                <div className="follows mx-auto mt-4 mb-5">
                    <p><span>Followers</span>: {followers.length}</p>
                    <p><span>Following</span>: {following.length}</p>
                </div>
                <div className="topics">
                    <p className="topics-text custom-primary">Interested</p>
                    <div className="topics-list text-uppercase">
                        {topics.join(' ')}
                    </div>
                </div>
                <Link to={`dev/${_id}`} className="view-button btn">View</Link>
            </div>
        </>
    );
};

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileCard;