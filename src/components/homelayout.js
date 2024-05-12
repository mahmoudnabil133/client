import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
const Homelayout = ()=>{
    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg" style={{backgroundColor:'white'}}>
            <Container>
            <Navbar.Brand href="#home">Book Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet/>
        </div>
    );
}

export default Homelayout

