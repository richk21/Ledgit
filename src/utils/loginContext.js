import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isloggedin, setLoggedIn] = useState(false);

// Check localStorage on component mount
useEffect(() => {
  const loggedIn = localStorage.getItem('isloggedin');
  if (loggedIn === 'true') {
    setLoggedIn(true);
  }

  console.log("is logged in: ", isloggedin);
}, []);

const login = () => {
  setLoggedIn(true);
  // Store isloggedin state in localStorage
  localStorage.setItem('isloggedin', 'true');
};

const logout = () => {
  setLoggedIn(false);
  // Remove isloggedin state from localStorage
  localStorage.removeItem('isloggedin');
};

  return (
    <LoginContext.Provider 
      value={{ 
        isloggedin, 
        login,
        logout
    }}>
      {children}
    </LoginContext.Provider>
  );
};
