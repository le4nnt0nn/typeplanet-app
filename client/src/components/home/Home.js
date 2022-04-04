import React, { useEffect } from 'react';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
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

    return (
        <>
            <body>
                <section class="gradient-custom">
                    <NavbarRoot />
                    <div class="container py-5 mt-5 text-center">
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