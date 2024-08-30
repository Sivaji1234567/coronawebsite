import React, { useState } from 'react';
import './style.css'; // Add CSS for styling the popup

const LoginPop = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleRegisterClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="app-container">
      <button onClick={handleRegisterClick}>Register</button>

      {isPopupVisible && (
        
        <div className="login-popup">
              <button style={{float:"right",backgroundColor:"green"}} onClick={handleClosePopup}><i class="fa fa-close"></i></button>
          <div className="popup-content">
            <h2>Login</h2>
            <form>
              <div>
                <label>Email:</label>
                <input type="email" required />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" required />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPop;
