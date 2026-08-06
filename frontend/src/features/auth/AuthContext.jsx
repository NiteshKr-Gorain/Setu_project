import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from './api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fast & non-blocking auth session hydration on initial load
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const token = authApi.getStoredToken();
      if (!token) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        // Race profile fetch against a 600ms timeout to ensure fast load times
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth hydration timeout')), 600)
        );

        const profile = await Promise.race([authApi.getMe(), timeoutPromise]);
        if (isMounted && profile) {
          setCurrentUser(profile);
        }
      } catch (err) {
        // If token is invalid or request timed out, clear session silently
        if (err.message !== 'Auth hydration timeout') {
          authApi.logoutUser();
        }
        if (isMounted) {
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Login handler
  const login = async (credentials) => {
    const data = await authApi.loginUser(credentials);
    setCurrentUser(data.user);
    return data;
  };

  // Register handler
  const register = async (userData) => {
    const data = await authApi.registerUser(userData);
    setCurrentUser(data.user);
    return data;
  };

  // Logout handler
  const logout = () => {
    authApi.logoutUser();
    setCurrentUser(null);
  };

  // Session-only local profile update
  const patchLocalProfile = (patch) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...patch } : null));
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    patchLocalProfile,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
