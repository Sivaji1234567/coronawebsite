import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import './style.css'


function Navbar() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  let email=sessionStorage.getItem("email");
  let p='';
  if(email){
     console.log(email);
     p=email.charAt(0).toUpperCase();
  } 
  const checkLoginStatus = () => {
      const login = sessionStorage.getItem("login");
      const loginStatus = JSON.parse(login);  // true
      setIsLoggedIn(loginStatus); 
  }

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.setItem("login",false)
        setIsLoggedIn(false); 
        setIsDropdownVisible(false); // Hide dropdown on logout
    };

  useEffect(() => {
      checkLoginStatus();
  });

  console.log("LOGGED STATUS:", isLoggedIn, typeof isLoggedIn)
  return (
    <div className="navbar"> 
        <div className='sub1'>covTrack</div>
         <div className='place'></div>
         <div className='sub2'><Link to="/">HOME</Link></div>
         <div className='sub2'> <Link to="/about">ABOUT</Link></div>
         <div className='sub2'> <Link to="/static">STATISTICS</Link></div>    
         <div className='sub2'> <Link to="/about">FAQ</Link></div>  
         {isLoggedIn ? (
                       <div className='sub3'>
                       <button className="profile-circle" onClick={toggleDropdown}>
                            {p}
                        </button>
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                <div className="dropdown-content">Your Profile</div>
                                <hr/>
                                
                            <div className="dropdown-content">{email}</div>
                               <hr/>
                                <div className="dropdown-content">
                                    <button className="box" onClick={handleLogout}>
                                    Logout
                                </button>
                                </div>
                            </div>
                        )}
                        </div>
                ) : (
                    <div className='gap'>
                    <button className='btn'>
                        <Link to="/login">REGISTER / LOGIN</Link>
                    </button>
                    </div>
                )}
    </div>   
  )
}

export default Navbar;
