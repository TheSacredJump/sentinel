// hooks/useAuth.js
'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/auth/status', {
        credentials: 'include'
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUser(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3003/api/auth/logout', {
        credentials: 'include'
      });
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    checkAuthStatus
  };
}