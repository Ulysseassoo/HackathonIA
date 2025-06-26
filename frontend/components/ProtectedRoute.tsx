"use client"

import { useAuthContext } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '@/lib/auth';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !token) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, token, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-serenity-cream via-white to-serenity-lavender/30">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-serenity-navy/60 font-lato">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !token) {
    return null;
  }

  return <>{children}</>;
}; 