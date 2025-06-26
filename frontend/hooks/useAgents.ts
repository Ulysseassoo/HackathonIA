import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200';

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  createdAt: Date;
  owner: string;
}

export interface CreateAgentData {
  name: string;
  description: string;
  tags: string[];
  link: string;
}

const fetchAgents = async (): Promise<AIAgent[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/aiagents`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Token expired');
    }
    throw new Error('Failed to fetch agents');
  }

  return response.json();
};

const createAgent = async (data: CreateAgentData): Promise<AIAgent> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/aiagents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create agent');
  }

  return response.json();
};

const deleteAgent = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/aiagents/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete agent');
  }
};

export const useAgents = () => {
  const queryClient = useQueryClient();

  const {
    data: agents = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
    staleTime: 5 * 60 * 1000,
  });

  const createAgentMutation = useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent IA créé avec succès !');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la création de l\'agent');
    },
  });

  const deleteAgentMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent IA supprimé avec succès !');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression de l\'agent');
    },
  });

  return {
    agents,
    isLoading,
    error,
    refetch,
    createAgent: createAgentMutation.mutate,
    deleteAgent: deleteAgentMutation.mutate,
    isCreating: createAgentMutation.isPending,
    isDeleting: deleteAgentMutation.isPending,
  };
}; 