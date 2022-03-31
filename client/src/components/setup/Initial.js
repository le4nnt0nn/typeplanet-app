import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Initial = ({ isAuth }) => {

    // if user logged then redirects to /home
    // TODO - REDIRECT HOME

    return (
        <body>
            <section class="gradient-custom">
                <nav class="float-end d-flex mr-2">
                    <div class="topbar_item"><Link to="/login">Login</Link></div>
                    <div class="topbar_item"><Link to="/register">Create my account</Link></div>
                </nav>
                <div class="container py-5 mt-5 text-center">
                    <div class="row">
                        <div class="mt-5 text-center">
                            <img class="logo" alt="Logo" src="logo.png" />
                            <h3>Hey dev! Join into</h3>
                            <h1>TypePlanet</h1>
                            <Link to="/login"><input type="submit" className="btn btn-outline-light btn-lg px-5 custom-primary-button" value="Discover Now" /></Link>
                            <p className="mt-4 text-white">
                                Already have an account? <Link to="/login" style={{ textDecoration: "none" }}><span class="fw-bold custom-secondary">Welcome Back</span></Link>
                            </p>
                        </div>
                        <div class="mt-5 d-flex-inline text-center">
                            <p class="text-white">TypePlanet © 2022</p>
                            <img class="astro float-right" alt="Astro" src="astro.png" />
                        </div>
                    </div>
                </div>
            </section>
        </body>
    );
}

Initial.propTypes = {
    isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Initial);