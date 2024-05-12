import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './welcome.css'; // Import your CSS file

function Welcome() {
  return (
    <div className="welcome" style={{minHeight:'700px'}}>
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Welcome to Our Book Store!</h1>
          <p>
            Dive into a world of imagination with our vast collection of books available in PDF format. Whether you're into fantasy, policy, or other intriguing genres, we've got you covered.
          </p>
          <p>
            Explore our library, discover new favorites, and enjoy the convenience of reading PDFs anytime, anywhere.
          </p>
          <div style={{ display: 'flex', gap: '13px', marginLeft:'600px' }}>
            <Button as={Link} to="/sign-in" variant="primary">Sign In</Button>
            <Button as={Link} to="/home" variant="primary">Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

