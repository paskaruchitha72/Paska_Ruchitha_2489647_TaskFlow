import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ role }) {
  const { role: currentRole } = useAuth();
  return currentRole === role ? <Outlet /> : <Navigate to="/403" />;
}
