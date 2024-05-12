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
  // const [searchItem, setSearchItem] = useState('');
  // const [searched, setSearched] = useState([]);
  // const [acitveSearch, setActiveSearch] =  useState('')

  const [dataMissed, setMissed] = useState('');

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    Axios.get('https://www.mahmoudnabil.tech/books')
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
        Axios.post('https://www.mahmoudnabil.tech/books', {
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
    Axios.delete(`https://www.mahmoudnabil.tech/books/${id}`)
      .then(res => res.data);
  };

  const startEdit = (id) => {
    const bookToEdit = books.find(book => book._id === id)
    setEditingBook(bookToEdit);
  };

  const updateBook = () => {
    Axios.put(`https://www.mahmoudnabil.tech/books/${editingBook._id}`, {
      title: editingBook.title,
      auther: editingBook.auther,
      pubYear: editingBook.pubYear,
      category:editingBook.category
    })
      .then(res => {
        setEditingBook(null);
      })
  }
  // useEffect(()=>{
  //   Axios.get('http://www.localhost:3001/search', {
  //     params:{
  //       search: searchItem
  //     }
  //   })
  //   .then(res=>{
  //     setSearched(res.data)
  //     console.log(searched)
  //   })
  //   .catch(err=> console.log(err))
  // }, [searchItem, searched])

  // const search = ()=>{
  //   setActiveSearch('now')
  // }
  // const delSearched = ()=>{
  //   setActiveSearch('')
  //}

  return (
    <div className="container mt-4" >
      <h1> Book list</h1>
      <label type='text' > search for name or category : </label>
      {/* <input type='text' placeholder='serach' value={searchItem} style={{backgroundColor:'gold'}} onChange={e =>setSearchItem(e.target.value) }/> */}
      <Button as={Link} to='/search'> click Search</Button>

      <br></br>
      <br></br>
      <br></br>

      <Row className='books-row'>

        {books.slice(0,10).map(book => (
          <Col key={book._id} md={4} >
            <Card className="mb-3 bookCard" style={{backgroundColor:'yellowgreen', border:'3px solid white'}} >
              <div className="bookImage" style={{ backgroundImage: `url(${book.imgUrl})`}} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Auther:</strong> {book.auther}<br />
                  <strong>Pub Year:</strong> {book.pubYear}
                </Card.Text>
                <div className="buttonGroup">
                  <Button as={Link} to={`/bookdetails/${book._id}`} variant="info" style={{backgroundColor:'orange'}}>details</Button>
                  <Button variant="info" onClick={() => startEdit(book._id)} style={{display:'none'}}>Edit</Button>
                  <Button variant="danger" className="mr-2" onClick={() => deleteTask(book._id)} style={{display: 'none'}}> Delete</Button>


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
                    <Form.Group controlId="editPubYear">
                      <Form.Label>category</Form.Label>
                      <Form.Control type="text" value={editingBook.category} onChange={e => setEditingBook({ ...editingBook, category: e.target.value })} />
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

      <Row className="mt-5" style={{display: 'none'}}>
        <Col>
          <h3>Insert a New Book:</h3>
          <Form>
            <Form.Group controlId="newTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>
            <Form.Group controlId="newAuther">
              <Form.Label>Auther</Form.Label>
              <Form.Control type="text" placeholder="Enter auther" value={auther} onChange={e => setAuther(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>Pub Year</Form.Label>
              <Form.Control type="number" placeholder="Enter pub year" value={pubYear} onChange={e => setPubYear(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>catigory</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={category} onChange={e => setCategory(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>            
            <Form.Group controlId="newPubYear">
              <Form.Label>description:</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={description} onChange={e => setDescription(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>pdfUrl:</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)}  style={{backgroundColor:'gray'}}/>
            </Form.Group>
            <Form.Group controlId="newPubYear">
              <Form.Label>imgUrl</Form.Label>
              <Form.Control type="text" placeholder="Enter pub year" onChange={e => setImg(e.target.value)}  style={{backgroundColor:'gray'}}/>
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

