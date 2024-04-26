import React, { useState } from 'react';
import Axios from 'axios';

function EditBookForm({ book, onClose, onUpdate }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pubYear, setYear] = useState(book.pubYear);

  const updateBook = () => {
    Axios.put(`http://localhost:3001/books/${book._id}`, {
      title: title,
      author: author,
      pubYear: pubYear
    })
      .then(res => {
        console.log('Book updated:', res.data);
        onUpdate(res.data); // Update the book in the parent component's state
        onClose(); // Close the edit form
      })
      .catch(err => {
        console.error('Error updating book:', err);
      });
  };

  return (
    <div className="edit-book-form">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="number" value={pubYear} onChange={e => setYear(e.target.value)} />
      <button onClick={updateBook}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditBookForm;
