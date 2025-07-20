import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from './auth';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize authentication state
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        // Get current session
        const { data: session, error: sessionError } = await AuthService.getCurrentSession();
        
        if (mounted && !sessionError && session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    if (!initialized) return;

    const unsubscribe = AuthService.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      setSession(session);
      setUser(session?.user || null);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
    });

    return unsubscribe;
  }, [initialized]);

  // Sign in methods
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await AuthService.signInWithEmail(email, password);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await AuthService.signInWithGoogle();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { data, error } = await AuthService.signInWithGitHub();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { data, error } = await AuthService.signInWithMicrosoft();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signUpWithEmail = async (email, password, options = {}) => {
    try {
      const { data, error } = await AuthService.signUpWithEmail(email, password, options);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await AuthService.signOut();
      if (!error) {
        setUser(null);
        setSession(null);
      }
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { data, error } = await AuthService.resetPassword(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signInWithEmail,
    signInWithGoogle,
    signInWithGitHub,
    signInWithMicrosoft,
    signUpWithEmail,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 