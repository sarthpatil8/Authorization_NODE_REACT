// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Check for token
    return isAuthenticated ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
