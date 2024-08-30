import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'
import validator from 'validator';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if(!validator.isEmail(email)){
      alert("The email you entered is not valid");
      return;
    }
    if(email & password){}
    axios.post('http://localhost:3003/signup', {email, password })
      .then(response => {
        navigate('/login');
      })
      .catch(error => {
        setError('Registration failed!');
      });
  };

  return (
    <div className="parent">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <div className='child'>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /></div>
      <div className='child'> 
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      </div>
      <div className='child3'>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      </div>

      <div className='child'><button onClick={handleRegister}>Register</button></div>
      <p>
        Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a>
        </p>
    </div>
  );
}

export default Signup;
