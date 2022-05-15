import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import './style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import useSound from 'use-sound';
// sounds
import logoutSound from '../../sounds/byeSound.mp3';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarRoot = ({ auth: { isAuth }, logout }) => {

    // user Id
    let [id, setId] = useState('');

    let [visibility, setVisibility] = useState('');

    // gets id for current user
    async function getCurrentUserId() {
        const res = await axios.get('/api/auth');
        return res.data._id;
    };

    // set name from current user
    // cleanup function 
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                getCurrentUserId().then(data => setId(data))
            }
        }, 1000)
    }, [id]);

    // checks if this user have profile, if not, hidde Me navbar button
    async function checkProfile() {
        const res = await axios.get('/api/profile');
        for (let i = 0; i < res.data.length; i++) {
            if (id === res.data[i].user._id) {
                return '';
            }
        }
        return 'hidden';
    }

    // set visibility for Me button
    // cleanup function 
    useEffect(() => {
        let mounted = true
        setTimeout(() => {
            if (mounted) {
                checkProfile().then(data => setVisibility(data))
            }
        }, 1000)
    }, [checkProfile, visibility]);

    // play sound on logout
    const [play] = useSound(logoutSound);

    function byeLogout() {
        logout();
        play();
    }

    const links = (
        <Nav className="ms-auto">
            <Nav.Link>
                <Link to='/home' className="link">Home</Link>
            </Nav.Link>
            <Nav.Link>
                {visibility !== 'hidden' ? (
                    <Link to={`/posts`} className="link">
                        {" "}
                        <span className="hide-sm">Posts</span>
                    </Link>
                ) : (
                    <span className={`me-noprofile hide-sm ${visibility}`}>Posts</span>
                )}
            </Nav.Link>
            <Nav.Link>
                <Link to='/devs' className="link">AstroDevs</Link>
            </Nav.Link>
            <Nav.Link>
                {visibility !== 'hidden' ? (
                    <Link to={`/me/${id}`} className="link">
                        {" "}
                        <span className="hide-sm">Me</span>
                    </Link>
                ) : (
                    <span className={`me-noprofile hide-sm ${visibility}`}>Me</span>
                )}
            </Nav.Link>
            <Nav.Link>
                <Link to='/login' className="link" onClick={byeLogout}>
                    {" "}
                    <span className="hide-sm">Logout</span>
                </Link>
            </Nav.Link>
        </Nav>
    );
    return (
        <div>
            {" "}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to='/home'>
                        <img className="logonav d-inline-block align-top" alt="Logo" src="logo.png" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {links}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarRoot);