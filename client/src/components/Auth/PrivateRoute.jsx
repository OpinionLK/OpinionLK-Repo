import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import React from 'react';

export const PrivateRoute = ({ children,allowedRoles }) => {

    const { user } = useAuthContext();
    const isAuthorized = user && allowedRoles.includes(user.type);

    return isAuthorized ? children : <Navigate to="/login" />;
};