const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200';

export interface User {
  id: string;
  fullname: string;
  email: string;
  isVerified?: boolean;
  isServiceProvider?: boolean;
  availableToken?: number;
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
  window.dispatchEvent(new CustomEvent('tokenChanged', { detail: { token } }));
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  window.dispatchEvent(new CustomEvent('tokenChanged', { detail: { token: null } }));
};

export const fetchUser = async (): Promise<User> => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      throw new Error('Token expired');
    }
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export const logout = (): void => {
  removeToken();
  window.location.href = '/auth';
}; 