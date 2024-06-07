import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isloggedin, setLoggedIn] = useState(false);

  return (
    <div className="navbar">
      <a href='#'>
        <h1 className="heading">
            <span className="ledg">Ledg</span>
            <span className="it">it</span>
        </h1>
      </a>
      {isloggedin ? 
      <div className="right-section-before-login">
        <a href="#" className="notifications-btn">
           Notifications
        </a>
        <a href="#" className="post-btn">Post</a>
        <a href='#' className="profile-btn">Profile</a> {/* profile should contain a circle with a letter-> containing profile, settings, logout */}
      </div>
      : 
      <div className="right-section-after-login">
        <a href='#' className="login-btn">Login</a>
        <a href="#" className="register-btn">Register</a>
      </div>
      
      }
    </div>
  );
};

export default Navbar;