import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// tostify
import { ToastContainer } from 'react-toastify';

const Login = ({ login, isAuth }) => {

    // state for FormData
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // get props from formData
    const { email, password } = formData;

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        // cancels the event if it is cancelable
        e.preventDefault();
        login({ email, password });
    }

    // if user logged then redirects to /home
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
                                        <h2 class="mb-2 text-uppercase">Login</h2>
                                        <p class="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-group form-outline form-white mb-4">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="Email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => handleInput(e)}
                                                required
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

                                        <input type="submit" className="btn btn-outline-light btn-lg px-5 custom-primary-button" value="Login" />
                                        <ToastContainer />

                                        <p className="my-4">
                                            Don"t have an account? <Link to="/register" style={{ textDecoration: "none" }}><span class="fw-bold custom-secondary">Sign Up</span></Link>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);