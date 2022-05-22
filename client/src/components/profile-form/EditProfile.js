import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

import './style.css';

// toastify
import { info, success } from '../../utils/toasts';
import { ToastContainer } from 'react-toastify';

const EditProfile = ({ createProfile }) => {
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
                info('Change your mind!');
                break;
            case 2:
                info('Time to change your topics?');
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
        success('Your info is now modified!');
    }

    return (
        <>
            <nav className="float-end d-flex mr-2">
                <div className="topbar_item"><Link to="/home">Back</Link></div>
            </nav>
            <div className="container py-5 mt-5 text-center">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="text-white custom-primary">
                            <form class="p-5 text-center" className="form" onSubmit={(e) => handleSubmit(e)}>
                                <h2 className="mb-2 text-uppercase">Edit your profile!</h2>
                                <p className="text-white-50 mb-5">Modify some info about yourself :)</p>

                                <div className="form-group form-outline form-white mb-4">
                                    <textarea
                                        className="form-control form-control-lg"
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
                                        className="form-control form-control-lg"
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
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your topics"
                                        name="topics"
                                        value={topics}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <small className="form-text">
                                        Please use comma separated values (eg. JS,JAVA,REACT)
                                    </small>
                                    <p className="recommended mt-3">
                                        Recommended: Use these options
                                        <br />
                                        (<strong>REACT, ANGULAR, JS, JAVA, C#</strong>)
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(EditProfile);