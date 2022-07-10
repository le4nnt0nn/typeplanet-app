import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileCard from './ProfileCard';
import NavbarRoot from '../setup/Navbar';

// sound for search input
import useSound from 'use-sound';
import searchSound from '../../sounds/searchSound.mp3';

const Profiles = ({ getAllProfiles, profile: { profiles } }) => {

    // declare search input sound
    const [play] = useSound(searchSound);

    // unmount component for cleanup
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getAllProfiles();
            }
        }, 2000)
    }, [getAllProfiles]);

    const [foundUsers, setFoundUsers] = useState(profiles);
    // the value of the search field 
    const [name, setName] = useState('');

    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                setFoundUsers(profiles);
            }
        }, 2000)
    }, [setFoundUsers, profiles]);

    const filter = (e) => {
        const keyword = e.target.value;
        // play type sound
        play()
        if (keyword !== '') {
            const results = profiles.filter((profile) => {
                console.log(profile.user.name.toLowerCase().startsWith(keyword.toLowerCase())) //
                return profile.user.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(profiles);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };
    console.log(foundUsers)


    return (
        <>
            <body>
                <NavbarRoot />
                <div className="text-center">
                    <div className="mt-5">
                        <h2 className="text-white">AstroDevs</h2>
                        <p className="secondary-text">People like you in one click</p>
                        <div>
                            <input
                                type="search"
                                value={name}
                                onChange={filter}
                                className="search-user-input"
                                placeholder="Search a dev"
                            />
                            {foundUsers.length && profiles.length > 0 ? (
                                foundUsers.map((profile) => (
                                    <ProfileCard key={profile._id} profile={profile} />
                                ))
                            ) : (
                                <div>
                                    <h2 className="no-found-text">Ooops, there is no profile here :( </h2>
                                    <img className="astro astro-ups" src="astroUps.png" alt="AstroUps"></img>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
};

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);