"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MOCK AUTHENTICATION: bypass firebase, read from local storage
    const checkMockSession = () => {
      const mockSession = localStorage.getItem('mockAdminSession');
      if (mockSession === 'active') {
        setUser({ email: 'admin@gmail.com', uid: 'mock-123', displayName: 'Admin' } as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkMockSession();

    // Listen to manual storage events if logged in/out across tabs
    window.addEventListener('storage', checkMockSession);
    return () => window.removeEventListener('storage', checkMockSession);

    /* 
    // REAL FIREBASE LOGIC (Keep commented until DB is ready):
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
    */
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
