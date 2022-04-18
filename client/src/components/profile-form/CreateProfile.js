import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

import './style.css';

// toastify
import { info, success } from '../../utils/toasts';
import { ToastContainer } from 'react-toastify';

const CreateProfile = ({ createProfile }) => {
    const [formData, setFormData] = useState({
        description: "",
        bio: "",
        topics: "",
    });

    // random info for user on toasts
    useEffect(() => {
        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        switch (random(0, 3)) {
            case 0:
                info('Think on a description that defines you well!');
                break;
            case 1:
                info('Other devs want to meet you!');
                break;
            case 2:
                info('You can change these fields at any time');
                break;
            default:
                break;
        }

    }, []);

    // get fields from formData
    const {
        description,
        bio,
        topics
    } = formData

    const handleChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile(formData);
        success('Your profile is now created!');
    }

    return (
        <>
            <nav class="float-end d-flex mr-2">
                <div class="topbar_item"><Link to="/home">Back</Link></div>
            </nav>
            <div class="container py-5 mt-5 text-center">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="text-white custom-primary">
                            <form class="p-5 text-center" className="form" onSubmit={(e) => handleSubmit(e)}>
                                <h2 class="mb-2 text-uppercase">Create your profile!</h2>
                                <p class="text-white-50 mb-5">Put some info about yourself :)</p>

                                <div className="form-group form-outline form-white mb-4">
                                    <textarea
                                        class="form-control form-control-lg"
                                        placeholder="Put a short description about you, dev!"
                                        name="description"
                                        value={description}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {" "}
                                    </textarea>
                                    <small className="form-text">Describe yourself in some words!</small>
                                </div>

                                <div className="form-group form-outline form-white mb-4">
                                    <textarea
                                        class="form-control form-control-lg"
                                        placeholder="Here's your bio!"
                                        name="bio"
                                        value={bio}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {" "}
                                    </textarea>
                                    <small className="form-text">Tell about yourself to the planet</small>
                                </div>

                                <div className="form-group form-outline form-white mb-4">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your topics"
                                        name="topics"
                                        value={topics}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <small className="form-text">
                                        Please use comma separated values (eg. JS,NODE,REACT)
                                    </small>
                                    <p className="recommended mt-3">
                                        Recommended: Use these options
                                        <br/>
                                        (<strong>REACT, ANGULAR, JS, NODE, JAVA, C#</strong>)
                                    </p>
                                </div>
                                <button className='btn btn-outline-light btn-lg px-5 custom-primary-button'>Submit</button>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);