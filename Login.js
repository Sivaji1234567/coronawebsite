import React, {useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
// import './App.css'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [login,setLogin]=useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3003/login', {
        email:email,
        password: password
      });
       
      if (response.data.status === 'success') {
      // console.log(response.data.token);
        let  togg = response.data.token;
        // setLogin(true);
        console.log("token",togg);
        // console.log("user",login);
        localStorage.setItem("token",togg);
        sessionStorage.setItem("email",email);
        sessionStorage.setItem("login",true);
        navigate('/static');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('You are not Registered or invalid credentials');
    }
  };
  return (
    <div className="parent">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <div className='child'>
      <input
        type="text"
        placeholder="Enter your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </div>
      <div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      </div>
  <div className='child'>
      <a  href="#" onClick={() => navigate('/forget')}>Forget Password ?</a>
</div>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't  have an account? <a href="#" onClick={() => navigate('/signup')}>Signup</a>
        </p>
    </div>
  );
}

export default Login;
