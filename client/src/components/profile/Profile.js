import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
            <Link to='/devs' className='btn btn-light'>
                Back
            </Link>
            {auth.user._id === id && (
                <h3>Edit</h3>
            )}
            <div className="text-center">
                <img src={user.avatar} className="rounded-circle" />
                <br />
                {user.name}
                <br />
                {profile.profiles.description}
                <br />
                {profile.profiles.bio}
                <br />
                <h4>Topics: {profile.profiles.topics && profile.profiles.topics.join(' ')}</h4>
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

