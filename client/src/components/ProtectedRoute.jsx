import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  // If logged in, show the page
  return children;
}

export default ProtectedRoute;
