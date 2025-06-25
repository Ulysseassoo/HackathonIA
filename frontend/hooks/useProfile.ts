import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ExtendedUser } from './useAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200';

export interface UpdateProfileData {
  fullname?: string;
  bio?: string;
  isServiceProvider?: boolean;
  pricePerDay?: number;
  skills?: string[];
}

const updateProfile = async (userId: string, data: UpdateProfileData): Promise<ExtendedUser> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateProfileData }) =>
      updateProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profil mis à jour avec succès !');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise à jour du profil');
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
}; 