import React, { useState } from 'react';
import './style.css';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

// tostify
import { ToastContainer } from 'react-toastify';

const Register = ({ register, isAuth }) => {

    // state for FormData
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
        birth: "",
    });

    // get props from formData
    const { name, email, password, city, birth } = formData;

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        register({ name, email, password, city, birth });

    };

    // if user auths then redirects to /home
    if (isAuth) {
        return <Navigate replace to="/home" />
    }

    return (
        <>
            <body>
                <section class="gradient-custom">
                    <nav class="float-end d-flex mr-2">
                        <div class="topbar_item"><Link to="/">Back</Link></div>
                    </nav>
                    <div class="container py-5 mt-5 text-center">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div class="text-white custom-primary">
                                    <form class="p-5 text-center" className="form" onSubmit={(e) => handleSubmit(e)}>
                                        <h2 class="mb-2 text-uppercase">Register</h2>
                                        <p class="text-white-50 mb-5">Join into the biggest dev community!</p>

                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => handleInput(e)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => handleInput(e)}
                                                name="email"
                                            />
                                        </div>
                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                minLength="6"
                                                value={password}
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </div>
                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={city}
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </div>
                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="Birth"
                                                name="birth"
                                                value={birth}
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </div>
                                        <input type="submit" className="btn btn-outline-light btn-lg px-5 custom-primary-button" value="Register" />
                                        <ToastContainer />

                                        <p className="my-4">
                                            Already have an account? <Link to="/login" style={{ textDecoration: "none" }}><span class="fw-bold custom-secondary">Login Now</span></Link>
                                        </p>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { register })(Register);