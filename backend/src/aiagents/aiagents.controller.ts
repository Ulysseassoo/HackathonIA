import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AiagentsService } from './aiagents.service';
import { CreateAiAgentDto, UpdateAiAgentDto } from './dtos/aiagents.dto';

@Controller('aiagents')
export class AiagentsController {
  constructor(private readonly aiagentsService: AiagentsService) {}

  @Get()
  findAll() {
    return this.aiagentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiagentsService.findOne(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.aiagentsService.findByName(name);
  }

  @Get('skill/:skillId')
  findBySkill(@Param('skillId') skillId: string) {
    return this.aiagentsService.findBySkill(skillId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createAiAgentDto: CreateAiAgentDto) {
    return this.aiagentsService.create(createAiAgentDto);
  }

  @Post('update/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateAiAgentDto: UpdateAiAgentDto) {
    return this.aiagentsService.update(id, updateAiAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiagentsService.remove(id);
  }

  @Post(':agentId/skills/:skillId')
  addSkillToAgent(
    @Param('agentId') agentId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.aiagentsService.addSkillToAgent(agentId, skillId);
  }

  @Delete(':agentId/skills/:skillId')
  removeSkillFromAgent(
    @Param('agentId') agentId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.aiagentsService.removeSkillFromAgent(agentId, skillId);
  }
}
