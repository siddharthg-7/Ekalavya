import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRole: 'learner' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole }) => {
  const { session } = useAuth();
  const location = useLocation();

  // If no session exists at all, redirect to /login
  if (!session.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Cross-role protection:
  // If a learner tries to access admin routes, redirect to /learner
  if (allowedRole === 'admin' && session.role === 'learner') {
    return <Navigate to="/learner" replace />;
  }

  // If an admin tries to access learner routes, redirect to /admin
  if (allowedRole === 'learner' && session.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // If a learner lacks an officialId, send them to the demo picker
  if (allowedRole === 'learner' && !session.officialId) {
    return <Navigate to="/demo" replace />;
  }

  return <Outlet />;
};
