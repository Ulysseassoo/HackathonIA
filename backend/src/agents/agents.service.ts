// src/agents/agents.service.ts
import { Injectable } from '@nestjs/common';
import { getAgentsMetadata, getAgent } from './agents-registry';
import { ConversationsService } from '../conversations/conversations.service';
import { HumanMessage } from '@langchain/core/messages';
import { RunnableConfig } from '@langchain/core/runnables';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AgentsService {
  constructor(private conversations: ConversationsService) {}

  async loadAgentsConfig() {
    try {
      return getAgentsMetadata();
    } catch {
      return [];
    }
  }

  async invokeAgent(agentId: string, body: any) {
    const thread = body?.thread_id || uuidv4();
    const runId = uuidv4();
    const agent = getAgent(agentId);

    this.conversations.addMessage(thread, {
      type: 'human',
      content: body?.message || '',
      timestamp: new Date().toISOString(),
    });

    const config: RunnableConfig = {
      configurable: { thread_id: thread },
      runId,
    };
    const result = await agent.invoke(
      { messages: [new HumanMessage({ content: body?.message || '' })] },
      config,
    );
    const last = result?.messages?.at(-1)?.content ?? 'Aucune réponse';

    this.conversations.addMessage(thread, {
      type: 'ai',
      content: last,
      timestamp: new Date().toISOString(),
    });

    return { content: last, thread_id: thread, run_id: runId };
  }

  async streamAgent(agentId: string, body: any, req: Request, res: Response) {
    const thread = body.thread_id || uuidv4();
    const runId = uuidv4();
    const agent = getAgent(agentId);
    const inactive = { active: true };

    this.conversations.addMessage(thread, {
      type: 'human',
      content: body.message,
      timestamp: new Date().toISOString(),
    });

    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    res.write('event: stream_start\n\n');

    const headers = new Headers();
    let full = '';
    try {
      const stream = await agent.stream(
        { messages: [new HumanMessage({ content: body.message })] },
        { configurable: { thread_id: thread }, runId },
      );
      for await (const chunk of stream) {
        if (!inactive.active) break;
        for (const nodeData of Object.values(chunk)) {
          if (nodeData?.messages) {
            for (const msg of nodeData.messages as any[]) {
              if (msg.content && !msg.tool_call_id) {
                const text = msg.content.toString();
                full += text;
                for (const chunk of text.match(/.{1,10}/g) || [text]) {
                  res.write(
                    `event: stream_token\ndata: ${JSON.stringify({ token: chunk })}\n\n`,
                  );
                }
              }
            }
          }
        }
      }
    } catch (e) {
      res.write(
        `event: tool_execution_error\ndata: ${JSON.stringify({ name: 'agent_stream', error: e.message })}\n\n`,
      );
    }

    this.conversations.addMessage(thread, {
      type: 'ai',
      content: full,
      timestamp: new Date().toISOString(),
    });
    res.write(
      `event: stream_end\ndata: ${JSON.stringify({ thread_id: thread })}\n\n`,
    );
    res.end();
    req.on('close', () => (inactive.active = false));
  }

  async stopStream(thread_id: string) {
    // Pour SSE, on interrompt côté client
    return { status: 'success', message: 'Stop demandé' };
  }
}
