import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

import moment from 'moment';

// icons
import { FaBirthdayCake, FaBuilding } from 'react-icons/fa';

import BarLevel from '../bar-level/BarLevel';

import './style.css';

const Profile = ({
    getProfileById,
    profile,
    auth,
}) => {
    // params
    const { id } = useParams();

    // user profile
    let [user, setUser] = useState('');

    // checks if user have profile
    async function getUserData() {
        const res = await axios.get('/api/users')
        let thisUser = '';
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]._id === id) {
                thisUser = res.data[i]
                return thisUser
            }
        }
        return null
    }

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

    // get user from profile
    useEffect(() => {
        getUserData().then(data => setUser(data))
    }, [user]);

    return (
        <>
            <div>
                <div className="back-button">
                    <Link to='/devs' className='back btn'>
                        Back
                    </Link>
                </div>
                <div className="profile-view-card">
                    <div className="top-wrap text-center">
                        {auth.user._id === id && (
                            <Link to='/edit-profile' className='edit btn'>Edit</Link>
                        )}
                        <div className="avatar-prof">
                            <img src={user.avatar} className="rounded-circle" />
                        </div>
                        <div className="text-center">
                            <span className="primary-prof-text">{user.name}</span>
                            <p className="description-text">{profile.profiles.description}</p>
                        </div>
                        <p className="level-text">Level: {user.level}</p>
                        <BarLevel level={user.level} />
                        <div className="city-text text-white">
                            <FaBuilding />
                            <p>{user.city}</p>
                        </div>
                        <div className="birth-wrapp">
                            <FaBirthdayCake className="birth-text" />
                            <p className="birth-text">{moment(user.birth).format('DD-MM-YYYY')}</p>
                        </div>
                        <div className="middle-wrap text-center">
                            <div className="bio-wrap">
                                <h4 className="secondary-prof-text">Bio</h4>
                                <p className="bio-text">{profile.profiles.bio}</p>
                            </div>
                            <div className="topics-wrap">
                                <h4 className="secondary-prof-text">Interested in</h4>
                                <p className="topics-text">{profile.profiles.topics && profile.profiles.topics.join(' ')}</p>
                            </div>
                            <div className="posts-wrap">
                                <h4 className="secondary-prof-text">Posts</h4>
                                <p className="posts-text">{profile.profiles.posts}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

