import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import Homelayout from './components/homelayout';
import Welcome from './components/welcome';
import BookDetails from './components/BookDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homelayout />}>
            <Route index element={<Welcome />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path='/bookdetails/:id' element={<BookDetails/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
