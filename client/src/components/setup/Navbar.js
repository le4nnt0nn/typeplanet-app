import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import './style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import "bootstrap/dist/css/bootstrap.min.css";

const NavbarRoot = ({ auth: { isAuth }, logout }) => {

    const links = (
        <Nav className="ms-auto">
            <Nav.Link>
                <Link to='/home' className='link'>Home</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/posts' className='link'>Posts</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/devs' className='link'>AstroDevs</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/me' className='link'>
                    {" "}
                    <span className='hide-sm'>Me</span>
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/login' className='link' onClick={logout}>
                    {" "}
                    <span className='hide-sm'>Logout</span>
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