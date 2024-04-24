import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get('http://localhost:3001/books')
      .then(res => {
        console.log('Data from Axios:', res.data);
        setBooks(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err);
      });
  }, []); // Empty dependency array to fetch data once on component mount

  return (
    <div className="App">
      <h1>Books List</h1>
      {error ? (
        <div>Error fetching data. Please try again later.</div>
      ) : books.length > 0 ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <div>Title: {book.title}</div>
              <div>Author: {book.author}</div>
              <div>PubYear: {book.pubYear}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No books available</div>
      )}
    </div>
  );
}

export default App;
