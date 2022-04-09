import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <>
            <h2>profiles</h2>
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