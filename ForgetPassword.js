import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './App.css'
import Verify from './Verify';



function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const requestOtp= async () => {
    try {
      const response = await axios.post('http://localhost:3003/sendemail', {
      email:email,
      })

      // if (response.data.status === 'success') {
        navigate('/verify');
      //  } else {
      //  setError(response.data.message);
      //  }
     } catch (error) {
     setError('The email you entered is not Registered');
    }
  }
  

  return (
  <div>
    {/* <Verify data={email}/> */}
    <div className="parent">
      <h2>Forget Password</h2>
      {error && <p className="error">{error}</p>}
      <div className='child'>
      <input
        type="text"
        placeholder="Enter your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </div>

      <button onClick={requestOtp}>Send otp</button>
    </div>
    </div>
  );
}

export default ForgetPassword;
