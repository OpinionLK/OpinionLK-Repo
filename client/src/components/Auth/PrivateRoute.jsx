import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import React from 'react';

export const PrivateRoute = ({ children }) => {

    const { user } = useAuthContext();
    return user ? children : <Navigate to="/login" />;
};