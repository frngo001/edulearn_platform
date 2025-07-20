import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from 'lib/AuthContext';

const Logout = () => {
  const { signOut, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      if (isAuthenticated && !isLoggingOut) {
        setIsLoggingOut(true);
        
        try {
          await signOut();
          console.log('Logout successful');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          setIsLoggingOut(false);
          setLogoutComplete(true);
        }
      } else if (!isAuthenticated) {
        setLogoutComplete(true);
      }
    };

    performLogout();
  }, [isAuthenticated, signOut, isLoggingOut]);

  // If logout is complete or user is not authenticated, redirect to login
  if (logoutComplete || !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Show loading spinner during logout
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-secondary text-sm">Abmelden...</p>
      </div>
    </motion.div>
  );
};

export default Logout; 