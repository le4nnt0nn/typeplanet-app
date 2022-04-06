import React, { useEffect, useState } from 'react';
import './style.css';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getCurrentProfile, removeProfile } from "../../actions/profile";

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
    removeProfile,
    /**auth: { user },
    profile: { profile } */
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    // city
    let [name, setName] = useState('');

    async function getUsername() {
        const res = await axios.get('/api/auth');
        return res.data.name;
    };
    // set name from current user
    useEffect(() => {
        getUsername().then(data => setName(data))
    }, [name]);

    return (
        <>
            <body>
                <section class="gradient-custom">
                    <NavbarRoot />
                    <img class="astro astro-home center" src="astro2.png" alt="Astro" />
                    <h3 class="user-text text-center"><strong>{name}</strong>'s spaceship</h3>
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
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, removeProfile })(Home);