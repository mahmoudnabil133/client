import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Book Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="jumbotron text-center">
        <div className="container">
          <h1>Welcome to Our Book Store!</h1>
          <p>
            Dive into a world of imagination with our vast collection of books available in PDF format. Whether you're into fantasy, policy, or other intriguing genres, we've got you covered.
          </p>
          <p>
            Explore our library, discover new favorites, and enjoy the convenience of reading PDFs anytime, anywhere.
          </p>
          <p>
            <Button as={Link} to="/sign-in" variant="primary">sign-in</Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
