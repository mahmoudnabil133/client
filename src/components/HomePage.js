import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [auther, setAuther] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [editingBook, setEditingBook] = useState(null);

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
    Axios.post('http://localhost:3001/books', {
      title: title,
      auther: auther,
      pubYear: pubYear
    })
      .then(res => res.data);
  }

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3001/books/${id}`)
      .then(res => res.data);
  };

  const startEdit = (id) => {
    const bookToEdit = books.find(book => book._id === id)
    setEditingBook(bookToEdit);
  };

  const updateBook = () => {
    Axios.put(`http://localhost:3001/books/${editingBook._id}`, {
      title: editingBook.title,
      auther: editingBook.auther,
      pubYear: editingBook.pubYear
    })
      .then(res => {
        setEditingBook(null);
      })
  }

  return (
    <div className="container mt-4">
      <h1> Book list</h1>
      <Row>
        {books.map(book => (
          <Col key={book._id} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Auther:</strong> {book.auther}<br />
                  <strong>Pub Year:</strong> {book.pubYear}
                </Card.Text>
                <div>
                  <Button variant="danger" className="mr-2" onClick={() => deleteTask(book._id)}>Delete</Button>
                  <Button variant="info" onClick={() => startEdit(book._id)}>Edit</Button>
                </div>
                {editingBook && editingBook._id === book._id && (
                  <Form className="mt-3">
                    <Form.Group controlId="editTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" value={editingBook.title} onChange={e => setEditingBook({ ...editingBook, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="editAuther">
                      <Form.Label>Auther</Form.Label>
                      <Form.Control type="text" value={editingBook.auther} onChange={e => setEditingBook({ ...editingBook, auther: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="editPubYear">
                      <Form.Label>Pub Year</Form.Label>
                      <Form.Control type="number" value={editingBook.pubYear} onChange={e => setEditingBook({ ...editingBook, pubYear: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={updateBook}>Save</Button>
                    <Button variant="secondary" className="ml-2" onClick={() => setEditingBook(null)}>Cancel</Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <h3>Insert a New Book:</h3>
          <Form>
            <Form.Group controlId="newTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newAuther">
              <Form.Label>Auther</Form.Label>
              <Form.Control type="text" placeholder="Enter auther" value={auther} onChange={e => setAuther(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>Pub Year</Form.Label>
              <Form.Control type="number" placeholder="Enter pub year" value={pubYear} onChange={e => setPubYear(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={createUser}>Add Book</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}


export default HomePage
