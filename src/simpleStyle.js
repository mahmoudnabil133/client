import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [auther, setAuthor] = useState("");
  const [pubYear, setYear] = useState("");
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

  const deleteTask = (id)=>{
    Axios.delete(`http://localhost:3001/books/${id}`)
    .then(res => res.data)
  };

  const startEdit = (id)=>{
    const bookToEdit = books.find(book=> book._id === id)
    setEditingBook(bookToEdit);
  };

  const updateBook = ()=>{
    Axios.put(`http://localhost:3001/books/${editingBook._id}`, {
      title:editingBook.title,
      auther:editingBook.auther,
      pubYear:editingBook.pubYear
    })
    .then(res=>{
      setEditingBook(null)
    })
  }
  return (
    <div className="container">

      <h1 className="mt-3">Books List</h1>
      <ul className="list-group">
        {books.map(book => (
          <li className="list-group-item"> 
            title: {book.title}<br />
            auther: {book.auther}<br />
            pubYear: {book.pubYear}
            <button className='del' onClick={()=> deleteTask(book._id)}> del</button>
            <button classNmae='edit' onClick={()=> startEdit(book._id)}> edit </button>
            {editingBook && editingBook._id === book._id && (
            <div>
              <br></br>
              <input type='text' value={editingBook.title} onChange={ e => setEditingBook({...editingBook, title:e.target.value})} />
              <input type='text' value={editingBook.auther} onChange={ e => setEditingBook({...editingBook, auther:e.target.value})}/>
              <input type='number' value={editingBook.pubYear} onChange={ e => setEditingBook({...editingBook, pubYear:e.target.value})}/>
              <Button variant='primary' onClick={updateBook}>Save</Button>
              <Button variant='secondary' onClick={()=>setEditingBook(null)}>cancel</Button>
            </div>
            )}
          </li>
        ))}
      </ul>

      <h3 className="mt-5">Insert a New Book:</h3>

      <div className='insertBook'>
        <input type="text" className="form-control mb-2" placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder='Author' onChange={e => setAuthor(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder='Pub Year' onChange={e => setYear(e.target.value)} />
        <Button variant="primary" onClick={createUser}>Add Book</Button>
      </div>
    </div>
  );
}

export default App;
