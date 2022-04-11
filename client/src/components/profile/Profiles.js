import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileCard from './ProfileCard';

const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <>
            <h2>profiles</h2>
            <div>
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))
                ) : (
                    <h2>Ooops, there is no profile here :( </h2>
                )}
            </div>
        </>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);