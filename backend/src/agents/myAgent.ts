import 'dotenv/config';

import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { loadAgentPrompt } from './tools/generate_prompt';
import { weather } from './tools/weather';
import { reserve } from './tools/reserve';

const myAgentPrompt = loadAgentPrompt('myAgent');

const agentModel = new ChatOpenAI({
  temperature: 0.5,
  model: 'dolphin3.0-llama3.1-8b', // ou le nom de votre modèle
  configuration: {
    baseURL: 'http://localhost:1234/v1',
    apiKey: 'not-needed', // LMStudio ne nécessite pas de clé API réelle
  },
});

//const agentModel = new ChatOpenAI({ temperature: 0.5, model: "gpt-4o-mini" });

const agentCheckpointer = new MemorySaver();
export const myAgent = createReactAgent({
  prompt: myAgentPrompt,
  llm: agentModel,
  tools: [weather, reserve],
  checkpointSaver: agentCheckpointer,
});
