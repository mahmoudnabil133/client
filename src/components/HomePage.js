import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
// import backgroundImage from '../imgs/x.png';
import './home.css'
function HomePage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [auther, setAuther] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [imgUrl, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const [dataMissed, setMissed] = useState('');

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    Axios.get('http://localhost:3001/books')
      .then(res => {
        // console.log('Data from Axios:', res.data);
        setBooks(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, [books]);

  const createBook = () => {
    if (! title || !auther || ! pubYear || !imgUrl || !category || !description || !pdfUrl) {
      setMissed('please enter missed data!!');
    } else {
      setMissed('')
        Axios.post('http://localhost:3001/books', {
          title: title,
          auther: auther,
          pubYear: pubYear,
          imgUrl: imgUrl,
          category:category,
          description: description,
          pdfUrl:pdfUrl
        })
          .then(res => res.data);
      }
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
      <Row className='books-row'>
        {books.map(book => (
          <Col key={book._id} md={4} >
            <Card className="mb-3 bookCard">
              <div className="bookImage" style={{ backgroundImage: `url(${book.imgUrl})` }} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Auther:</strong> {book.auther}<br />
                  <strong>Pub Year:</strong> {book.pubYear}
                </Card.Text>
                <div className="buttonGroup">
                  <Button as={Link} to={`/bookdetails/${book._id}`} variant="info" style={{backgroundColor:'yellowgreen'}}>details</Button>
                  <Button variant="info" onClick={() => startEdit(book._id)}>Edit</Button>
                  <Button variant="danger" className="mr-2" onClick={() => deleteTask(book._id)}>Delete</Button>


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

      <Row className="mt-5" style={{display: 'inline'}}>
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
            <Form.Group controlId="newPubYear">
              <Form.Label>catigory</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={category} onChange={e => setCategory(e.target.value)} />
            </Form.Group>            
            <Form.Group controlId="newPubYear">
              <Form.Label>description:</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>pdfUrl:</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>imgUrl</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" onChange={e => setImg(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={createBook}>Add Book</Button>
            <p style={{color:'red'}}>{dataMissed}</p>
          </Form>
        </Col>
      </Row>
    </div>
  );
}


export default HomePage
