import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, ListGroup, Row, Col } from 'react-bootstrap';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [auther, setAuthor] = useState("");
  const [pubYear, setPubYear] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/books')
      .then(res => {
        console.log('Data from Axios:', res.data);
        setBooks(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, [books]);

  const createUser = () => {
    if (title && auther && pubYear) {
      Axios.post('http://localhost:3001/books', {
        title: title,
        auther: auther,
        pubYear: pubYear
      })
        .then(res => res.data);
  }
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-primary">Books List</h1>
      <ListGroup style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '10px' }}>
        {books.map(book => (
          <ListGroup.Item key={book.id} style={{ backgroundColor: '#e9ecef', margin: '5px 0', border: '2px solid #ced4da', borderRadius: '5px' }}>
            <Row>
              <Col><strong style={{ color: '#007bff' }}>Title:</strong> {book.title}</Col>
              <Col><strong style={{ color: '#28a745' }}>Author:</strong> {book.auther}</Col>
              <Col><strong style={{ color: '#dc3545' }}>PubYear:</strong> {book.pubYear}</Col>
              {/* <Button variant='success'> delete </Button> */}
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h3 className="mt-5 text-primary">Insert a New Book:</h3>

      <Form className="insertBook" style={{ backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column sm={2} className="text-info">Title:</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAuthor">
          <Form.Label column sm={2} className="text-info">Author:</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter author" onChange={e => setAuthor(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPubYear">
          <Form.Label column sm={2} className="text-info">Pub Year:</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="Enter publication year" onChange={e => setPubYear(e.target.value)} />
          </Col>
        </Form.Group>

        <Button variant="success" onClick={createUser}>Add Book</Button>
      </Form>
    </Container>
  );
}

export default App;
