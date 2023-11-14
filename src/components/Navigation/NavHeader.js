import React from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg'

const NavHeader = (props) => {
    const { user } = useContext(UserContext)
    let location = useLocation()
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>

                <div className='nav-header'>
                    <Navbar expand="lg" bg='header' className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img src={logo} width="25" heitht="25" className='d-inline-block align-top' alt="logo" />
                                <span className='brand-name'>React</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className='nav-link' to="/" exact>Home</NavLink>
                                    <NavLink className='nav-link' to="/users">Users</NavLink>
                                    <NavLink className='nav-link' to="/projects">Projects</NavLink>
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item className='nav-link'>
                                        Welcome Felix!
                                    </Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>


            </>
        );
    } else {
        return <></>
    }
}

export default NavHeader;