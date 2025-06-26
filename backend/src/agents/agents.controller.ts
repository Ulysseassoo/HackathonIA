// src/agents/agents.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller()
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Get('agents')
  getAgents() {
    return this.agentsService.loadAgentsConfig();
  }

  @Post(':agentId/invoke')
  invoke(@Param('agentId') agentId: string, @Body() body) {
    return this.agentsService.invokeAgent(agentId, body);
  }

  @Post(':agentId/stream')
  stream(
    @Param('agentId') agentId: string,
    @Body() body,
    @Req() req,
    @Res() res,
  ) {
    return this.agentsService.streamAgent(agentId, body, req, res);
  }

  @Post(':agentId/stop')
  stop(@Body() body) {
    return this.agentsService.stopStream(body.thread_id);
  }
}
