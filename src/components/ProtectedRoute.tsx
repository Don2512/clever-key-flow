import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, Role } from '@/lib/auth';

const ProtectedRoute: React.FC<{ roles?: Role[]; children: React.ReactNode }> = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
