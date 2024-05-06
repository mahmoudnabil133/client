import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'; // Importing Bootstrap components

const BookDetails = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/books/${id}`)
        .then(res => {
            setBook(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Book Details</h1>
            <br></br>
            <br></br>
            <br></br>

            <Row>
                <Col md={6} className="mb-3">
                    <Image src={book.imgUrl} fluid alt="Book Cover" className="book-cover" style={{width:'300px'}}/>
                </Col>
                <Col md={6} className="details-col">
                    <h2 className="mb-3">{book.title}</h2>
                    <p className="mb-2"><strong>Category:</strong> {book.category}</p>
                    <p className="mb-2"><strong>Author:</strong> {book.auther}</p>
                    <p className="mb-2"><strong>Published Year:</strong> {book.pubYear}</p>
                    <p className="mb-2"><strong>Description:</strong> {book.description}</p>
                    <p className="mb-2"><strong>Read Book:</strong> <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Click Here</a></p>
                    <Button variant="primary" className="mt-3">Add to Library</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetails;
