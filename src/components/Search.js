import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './home.css';

function Search() {
  const [searchItem, setSearchItem] = useState('');
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    Axios.get('https://www.mahmoudnabil.tech/searchBook', {
      params: {
        search: searchItem
      }
    })
      .then(res => {
        setSearched(res.data);
      })
      .catch(err => console.log('Error:', err));
  }, [searchItem, searched]);

  return (
    <div className="container mt-4" style={{minHeight:'650px'}}>
      <h1>Search</h1>
      <label htmlFor="searchInput">Search for name or category:</label>
      <div className="input-group mb-3">
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchItem}
          onChange={e => setSearchItem(e.target.value)}
        /> 
        <div className="input-group-append">
          <Button as={Link} to='/search' variant="outline-primary">
            search
          </Button>
        </div>
      </div>
      <div>
        <label for='categories'>choose your category:  </label>
        <select id='categories' style={{marginLeft:'5px'}}>
          <option value="Databases" onClick={(e)=>setSearchItem(e.target.value)}>databases</option>
          <option value="Ai & Machene learning" onClick={(e)=>setSearchItem(e.target.value)}>Ai & Machene learning</option>
          <option value="cyper security" onClick={(e)=>setSearchItem(e.target.value)}>cyper security</option>
          <option value="Data sructure & Algorithms" onClick={(e)=>setSearchItem(e.target.value)}>Data sructure & Algorithms</option>
          <option value="war" onClick={(e)=>setSearchItem(e.target.value)}>war</option>          

        </select>
      </div>
      <br></br>
      <Row className='books-row'>
        {searched.length >= 1 && searched.map(book => (
          <Col key={book._id} md={4}>
            <Card className="mb-3 bookCard" style={{backgroundColor:'gold'}}>
              <div className="bookImage" style={{ backgroundImage: `url(${book.imgUrl})` }} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.auther}<br />
                  <strong>Pub Year:</strong> {book.pubYear}
                </Card.Text>
                <div className="buttonGroup">
                  <Button as={Link} to={`/bookdetails/${book._id}`} variant="info">
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Search;

