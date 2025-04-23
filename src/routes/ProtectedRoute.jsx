// src/components/ProtectedRoute.tsx
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};