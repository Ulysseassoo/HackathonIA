// src/conversations/conversations.service.ts
import { Injectable } from '@nestjs/common';

interface ChatMessage {
  type: string;
  content: string;
  timestamp: string;
  tool_calls?: any[];
  tool_call_id?: string;
}
interface ConversationState {
  thread_id: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}
@Injectable()
export class ConversationsService {
  private conv = new Map<string, ConversationState>();

  getOrCreate(threadId: string) {
    if (!this.conv.has(threadId)) {
      const now = new Date().toISOString();
      this.conv.set(threadId, {
        thread_id: threadId,
        messages: [],
        created_at: now,
        updated_at: now,
      });
    }
    return this.conv.get(threadId)!;
  }

  addMessage(thread: string, msg: ChatMessage) {
    const c = this.getOrCreate(thread);
    c.messages.push(msg);
    c.updated_at = new Date().toISOString();
  }

  findAll() {
    return Array.from(this.conv.values()).map((c) => ({
      thread_id: c.thread_id,
      message_count: c.messages.length,
      created_at: c.created_at,
      updated_at: c.updated_at,
      last_message: c.messages.at(-1)?.content.slice(0, 100) ?? 'Aucun message',
    }));
  }

  findOne(thread: string) {
    return this.conv.get(thread);
  }
}
