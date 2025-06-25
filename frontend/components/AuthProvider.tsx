"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/lib/auth';

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  refetch: () => void;
  forceUpdate: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handleTokenChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('tokenChanged', handleTokenChange);
    
    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      ...auth,
      forceUpdate: () => setForceUpdate(prev => prev + 1)
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 