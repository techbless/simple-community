import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';

import '../styles/Header.css';

function Header() {
    return (
        <Navbar bg="primary" variant="dark" expand="md">
        <Navbar.Brand href="/">Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;