import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { setIsCurrentlyLoggedIn } from '../redux/Auth/auth'
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
    const dispatch = useDispatch();
    const { isCurrentlyLogenInValue } = useSelector((state) => state.auth);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            dispatch(setIsCurrentlyLoggedIn(true));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(setIsCurrentlyLoggedIn(false));
    };
    console.log(isCurrentlyLogenInValue)
    return (
        <Wrapper>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="ml-auto justify-content-end">
                    {isCurrentlyLogenInValue ? (
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button variant="outline-primary" as={Link} to="/login">Login</Button>
                    )}
                </Nav>
            </Navbar>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  margin-left: 20px; 
  margin-right: 20px; 
`;

export default NavBar;
