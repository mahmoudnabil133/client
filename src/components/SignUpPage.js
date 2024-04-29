import React, { useEffect, useState} from 'react';
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Button } from 'react-bootstrap';

function SignUpPage() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [userNameMessage, setUserMessage] = useState("")
  const [usermailMessage, setMailMessage] = useState("")
  const [correctSignUp, setsignUp] = useState("")


  useEffect(()=>{
    Axios.get('http://localhost:3001/users')
      .then(res=>{
        setUsers(res.data)
      })
  }, [users]);
  const createUser = (e)=>{
    e.preventDefault();
    if (userName && email && password) { 
      const checkUser = users.find(user => user.userName === userName)
      const checkmail = users.find(user => user.email === email)

      if (! checkUser && ! checkmail) {
        setsignUp("you successfully signed up.")
        setUserMessage("")
        setMailMessage("")
        Axios.post('http://localhost:3001/users', {
          userName: userName,
          email:email,
          password:password
        })
          .then(res => {
            console.log(`data from axios ${res.data}`)
          })
          .catch(err=>{
            console.log('Axios error', err)
          });
      } else if (checkUser){
        setUserMessage("userName is already exists!!")
        setMailMessage(null)
        setsignUp(null)

      } else {
        setMailMessage("email is already exists!!")
        setUserMessage(null)
        setsignUp(null)

      }
  }

  };
  return (
    <div>
      <Container className="my-5 p-4" style={{ maxWidth: '500px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: ' #c5c4c3 ' }}>
        <h1 className="mb-4">Sign Up</h1>
        <Form>
          <Form.Group as={Col} controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' placeholder='Enter your username' onChange={e=>setUserName(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email' placeholder='Enter your email' onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Enter your password' onChange={e=>setPass(e.target.value)}/>
          </Form.Group>
          <br></br>
          <Button variant='primary' onClick={(e)=>createUser(e)}>
            Sign Up
          </Button>
          {userNameMessage && (
            <p style={{color:'red'}}>{userNameMessage}</p>
          )}
          {usermailMessage && (
            <p style={{color:'red'}}>{usermailMessage}</p>
          )}
          {correctSignUp && (
            <p style={{color:'green'}}>{correctSignUp}</p>
          )}
        </Form>
    </Container>

    </div>

  );
}

export default SignUpPage;
