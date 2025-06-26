import type { CompiledStateGraph } from '@langchain/langgraph';
import { myAgent } from './myAgent';

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
  agent: CompiledStateGraph<any, any>;
}

export const AGENTS_REGISTRY: Record<string, AgentInfo> = {
  myAgent: {
    id: 'myAgent',
    name: 'My Agent',
    description: 'Agent spécialisé pour MyAgent et les informations météo',
    agent: myAgent,
  },
};

export function getAgent(agentId: string): CompiledStateGraph<any, any> {
  const agentInfo = AGENTS_REGISTRY[agentId];
  if (!agentInfo) {
    throw new Error(`Agent '${agentId}' non trouvé.`);
  }
  return agentInfo.agent;
}

export function getAllAgents(): AgentInfo[] {
  return Object.values(AGENTS_REGISTRY);
}

export function getAgentsMetadata() {
  return Object.values(AGENTS_REGISTRY).map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));
}
