import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileCard from './ProfileCard';
import NavbarRoot from '../setup/Navbar';

const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <>
            <body>
                <NavbarRoot />
                <div className="text-center">
                    <div className="mt-5">
                        <h2 className="text-white">AstroDevs</h2>
                        <p className="secondary-text">People like you in one click</p>
                        <div>
                            {profiles.length > 0 ? (
                                profiles.map((profile) => (
                                    <ProfileCard key={profile._id} profile={profile} />
                                ))
                            ) : (
                                <h2>Ooops, there is no profile here :( </h2>
                            )}
                        </div>
                    </div>
                </div>
            </body>
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