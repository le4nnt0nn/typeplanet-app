import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getCurrentProfile } from "../../actions/profile";

import './style.css';

import NavbarRoot from '../setup/Navbar';
import { Forecast } from '../home/weather/Forecast';
import Cards from './card/Cards';

/**
 * @desc fetch data using actions, bring from redux's state and send it to components
 */

const Home = ({
    getCurrentProfile,
    auth: { user },
}) => {

    // current profile
    let [prof, setProf] = useState('');

    // checks if user have profile
    async function checkProfile() {
        const res = await axios.get('/api/profile');
        let itsMe = '';
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].user._id === user._id) {
                itsMe = res.data[i].user._id
                return itsMe
            }
        }
        return null
    }

    // name for user
    let [name, setName] = useState('');

    // gets name for current user
    async function getUsername() {
        const res = await axios.get('/api/auth');
        return res.data.name;
    };

    // loads functions
    // cleanup function 
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getCurrentProfile();
            }
        }, 1000)
    }, [getCurrentProfile]);

    // set name from current user
    // cleanup function 
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getUsername().then(data => setName(data))
            }
        }, 1000)
    }, [name]);

    // check this profile
    // cleanup function
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                checkProfile().then(data => setProf(data))
            }
        }, 1000)
    }, [prof]);


    return (
        <>
            <body>
                <section className="gradient-custom">
                    <NavbarRoot />
                    <img className="astro astro-home center" src="astro2.png" alt="Astro" />
                    <h3 className="user-text text-center"><strong>{name}</strong>'s spaceship</h3>
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
                    <div className="weather-wrapper container mt-5 mb-5 text-center">
                        <Forecast />
                    </div>
                    <div className="cards-wrapper mt-5 mb-5">
                        <Cards />
                    </div>
                    <div>
                        <img className="wave-back" src="waveBack.png" />
                    </div>
                </section>
            </body>
        </>
    );
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