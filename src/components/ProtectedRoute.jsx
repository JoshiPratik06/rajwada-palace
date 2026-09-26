import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Show toast notice only once
    toast('Please sign in or register to view your bookings', {
      icon: '🔒',
      id: 'auth_required_toast',
    });
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
