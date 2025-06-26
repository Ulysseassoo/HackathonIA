// src/conversations/conversations.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conv: ConversationsService) {}

  @Get()
  getAll() {
    return this.conv.findAll();
  }

  @Get(':threadId')
  getOne(@Param('threadId') threadId: string): Promise<any> {
    const c = this.conv.findOne(threadId);
    if (!c) return Promise.resolve({ error: 'Conversation non trouvée' });
    return Promise.resolve(c);
  }
}
