import React from 'react';
import './Nav.scss'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userService'
import { toast } from 'react-toastify'


const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext)
    let location = useLocation()
    const history = useHistory()

    const handleLogout = async () => {
        let data = await logoutUser();
        localStorage.removeItem('jwt')
        logoutContext()
        if (data && data.EC === 0) {
            toast.success('Log out success...')
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }

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
                                    <NavLink className='nav-link' to="/roles">Roles</NavLink>
                                    <NavLink className='nav-link' to="/projects">Projects</NavLink>
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.account.username}!
                                            </Nav.Item>

                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item >Change Password</NavDropdown.Item>

                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}>Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to='/login'>
                                            Login
                                        </Link>

                                    }

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