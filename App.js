import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgetPassword';
import Verify from './Verify';
import ResetPassword from './ResetPassword';
import Practice from './Practice';
function App() {
  return (
      <div>
         <Router>
       
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgotPassword/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/reset" element={<ResetPassword/>} />
          <Route path="/static" element={<Practice/>} />
        </Routes>
      </div>
    </Router>
     </div>
  );
}

export default App;
