import React, { useEffect, useState} from 'react';
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
function SignInPage() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [goodLogIn, setGoodLog] = useState("")
  const [badlogIn, setBadLog] = useState("")
  const [noData, setNoData] = useState("")

  const history = useNavigate()

  // const [usermailMessage, setMailMessage] = useState("")

  useEffect(()=>{
    Axios.get('http://localhost:3001/users')
      .then(res=>{
        setUsers(res.data)
      })
  }, [users]);
  const login = (e)=>{
    e.preventDefault();
    if (userName && password) {
      const checkUser = users.find(user => user.userName === userName)

      if (checkUser) {
        if (checkUser.password === password) {
          setGoodLog("you successfully logged in")
          setBadLog("")
          setNoData("")
          history('/home')
        } else{
          setBadLog("wrong password")
          setGoodLog("")
          setNoData("")
        }
      } else {
        setBadLog("username not exists")
        setGoodLog("")
        setNoData("")
      }
    } else {
      setNoData("please enter missed data")
    }
  };
  return (
    <div>
      <Container className="my-5 p-4" style={{ maxWidth: '500px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: ' #c5c4c3 ' }}>
        <h1 className="mb-4">Sign In</h1>
        <Form>
          <Form.Group as={Col} controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' placeholder='Enter your username' onChange={e=>setUserName(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Enter your password' onChange={e=>setPass(e.target.value)}/>
          </Form.Group>
          <br></br>
          <Button variant='primary' onClick={(e)=>login(e)}>
            Sign in
          </Button>
          <Button as = {Link} to='/sign-up' style={{marginLeft:'55%', background:'red'}}>Sign Up Page </Button>

          {goodLogIn && (
            <p style={{color:'green'}}>{goodLogIn}</p>
          )}
          {badlogIn && (
            <p style={{color:'red'}}>{badlogIn}</p>
          )}
          {noData && (
            <p style={{color:'red'}}>{noData}</p>
          )

          }
        </Form>
    </Container>

    </div>

  );
}

export default SignInPage;
