import React, { useEffect, useState } from 'react';
import './style.css';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getCurrentProfile } from "../../actions/profile";

import './style.css';

// tostify
import { ToastContainer } from 'react-toastify';

import NavbarRoot from '../setup/Navbar';
import { Forecast } from '../home/weather/Forecast';

/**
 * @desc fetch data using actions, bring from redux's state and send it to components
 */

const Home = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile }
}) => {

    let [prof, setProf] = useState('');

    async function checkProfile() {
        const res = await axios.get('/api/profile');
        let itsMe = '';
        for(let i = 0; i < res.data.length; i++) {
            console.log(res.data[i])
            if (res.data[i].user._id == user._id) {
                console.log('loool')
                itsMe = res.data[i].user._id
                return itsMe
            } else {
                console.log('no')
            }
        }
        return null
    }

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    useEffect(() => {
        checkProfile().then(data => setProf(data))
    }, [prof]);

    return (
        <>
            <body>
                <section class="gradient-custom">
                    <NavbarRoot />
                    <img class="astro astro-home center" src="astro2.png" alt="Astro" />
                    <h3 class="user-text text-center"><strong>{user.name}</strong>'s spaceship</h3>
                    {prof !== null ? (
                        <>

                        </>
                    ) : (
                        <>
                            {" "}
                            <p className="text-center">
                                You don't have a profile yet...
                                <br />
                                Why don't you create it? :)
                                <Link to='/create-profile' className="btn btn-primary mt-3">
                                    Create Profile
                                </Link>
                            </p>{" "}
                        </>
                    )}
                    <div class="weather-wrapper container mt-5 text-center">
                        <Forecast />
                    </div>
                </section>
            </body>
        </>
    )
};

Home.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    removeProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Home);