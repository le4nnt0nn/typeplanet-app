import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

// sounds
import useSound from 'use-sound';
import followSound from '../../sounds/followSound.mp3';

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

    const [play] = useSound(followSound);

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

    // get user from profile
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getUserData().then(data => setUser(data))
            }
        }, 2000)
    }, [getUserData, user]);

    // cleanup function 
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getProfileById(id)
            }
        }, 1000)
    }, [getProfileById, id]);

    // function for follow button 
    async function followUser() {
        play();
        const res = await axios.put(`/api/users/follow/${profile.profiles.user._id}`);
        window.location.reload();
        return res;
    }
    // function for unfollow button 
    async function unfollowUser() {
        play();
        const res = await axios.put(`/api/users/unfollow/${profile.profiles.user._id}`);
        window.location.reload();
        return res;
    }

    // followers & following
    const followers = user.followers && user.followers.length > 0 ? user.followers.length : 0;
    const following = user.following && user.following.length > 0 ? user.following.length : 0;

    return (
        <>
            <div>
                <div className="back-button">
                    <Link to="/devs" className="back btn">
                        Back
                    </Link>
                </div>
                <div className="profile-view-card">
                    <div className="top-wrap text-center">
                        {auth.user._id && auth.user._id === user._id && (
                            <Link to='/edit-profile' className='edit btn'>Edit</Link>
                        )}
                        {auth.user._id !== id && (
                            <div>
                                {auth.user.following.find(e => e.user === user._id) ? (
                                    <button className="unfollow-btn mt-3" onClick={unfollowUser}>UNFOLLOW</button>
                                ) : (
                                    <button className="follow-btn mt-3" onClick={followUser}>FOLLOW</button>
                                )}
                            </div>
                        )}
                        <div className="avatar-prof">
                            <img src={user.avatar} className="rounded-circle" />
                        </div>
                        <div className="text-center">
                            <span className="primary-prof-text">{user.name}</span>
                            <p className="description-text">{profile.profiles.description}</p>
                        </div>
                        <p className="level-text">Level: {Math.round(user.level)}</p>
                        <BarLevel level={user.level} />
                        <div className="follows-profile mt-5">
                            <p><span>Followers</span>: {followers}</p>
                            <p><span>Following</span>: {following}</p>
                        </div>
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
                                <p className="posts-text">{user.posts}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

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

