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
}) => {

    let [prof, setProf] = useState('');

    async function checkProfile() {
        const res = await axios.get('/api/profile');
        let itsMe = '';
        for(let i = 0; i < res.data.length; i++) {
            if (res.data[i].user._id === user._id) {
                itsMe = res.data[i].user._id
                return itsMe
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
                            <div className="no-profile text-center">
                                <p>Hey dev! You don't have a profile yet...</p>
                                <p>Why don't you <span className="text-uppercase">create it</span>? ✨</p>
                                <button>
                                <Link to="/create-profile" className="btn mt-1">
                                   <strong>Create Profile</strong>
                                </Link>
                                </button>
                            </div>
                        </>
                    )}
                    <div class="weather-wrapper container mt-5 mb-5 text-center">
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
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Home);