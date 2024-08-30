import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Verify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      window.alert('Enter a valid OTP');
    } else {
      try {
        const response = await axios.post('http://localhost:3003/verify', {
          otp: otp,
        });

        if (response.data.status === 'success') {
          navigate('/reset'); 
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('You are not registered or invalid credentials');
      }
    }
  };

  return (
    <div>
      <div className="parent">
        <h2>Verify OTP</h2>
        {error && <p className="error">{error}</p>}
        <div className="child">
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
}

export default Verify;
