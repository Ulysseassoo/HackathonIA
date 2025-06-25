import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchUser, getToken, removeToken, User } from '@/lib/auth';

export interface ExtendedUser extends User {
  bio?: string;
  pricePerDay?: number;
  skills?: string[];
}

export const useAuth = () => {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(getToken());

  useEffect(() => {
    const handleTokenChange = (event: CustomEvent) => {
      setTokenState(event.detail.token);
    };

    window.addEventListener('tokenChanged', handleTokenChange as EventListener);
    
    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange as EventListener);
    };
  }, []);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', token],
    queryFn: fetchUser,
    enabled: !!token,
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  useEffect(() => {
    if (error && token) {
      removeToken();
      setTokenState(null);
      router.push('/auth');
    }
  }, [error, token, router]);

  const isAuthenticated = !!user && !error;
  const isInitializing = isLoading && !!token;

  return {
    user: user as ExtendedUser | undefined,
    isLoading: isInitializing,
    isAuthenticated,
    error,
    refetch,
  };
}; 