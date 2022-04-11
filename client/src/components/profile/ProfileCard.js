import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileCard = ({
    profile: {
        user: { _id, name, avatar, level, city },
        description,
        topics
    },
}) => {
    return (
        <>
            <div>
                <img src={avatar} alt="avatar" className="rounded-circle" />
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{city}</p>
                <p>{level}</p>
                {topics.join(' ')}
            </div>
        </>
    )
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileCard;