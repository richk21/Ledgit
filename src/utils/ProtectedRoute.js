/* import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLogin } from './loginContext';

const ProtectedRoute = () => {
  const { isloggedin } = useLogin();

  return isloggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

 */
// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from './loginContext';

const ProtectedRoute = ({ children }) => {
  const { isloggedin } = useLogin();

  if (!isloggedin) {
    console.log("IS LOGGED IN KYA: ",isloggedin);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;