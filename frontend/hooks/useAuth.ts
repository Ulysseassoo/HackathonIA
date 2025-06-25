import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchUser, getToken, removeToken, User } from '@/lib/auth';

export const useAuth = () => {
  const router = useRouter();
  const token = getToken();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (error && token) {
      removeToken();
      router.push('/auth');
    }
  }, [error, token, router]);

  const isAuthenticated = !!user && !error;
  const isInitializing = isLoading && !!token;

  return {
    user,
    isLoading: isInitializing,
    isAuthenticated,
    error,
    refetch,
  };
}; 