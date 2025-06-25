import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AiagentsService } from './aiagents.service';
import { CreateAiAgentDto, UpdateAiAgentDto } from './dtos/aiagents.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('aiagents')
export class AiagentsController {
  constructor(private readonly aiagentsService: AiagentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return this.aiagentsService.findByOwner(req.user.id);
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
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createAiAgentDto: CreateAiAgentDto, @Request() req) {
    return this.aiagentsService.create({
      ...createAiAgentDto,
      owner: { id: req.user.id } as any,
    });
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateAiAgentDto: UpdateAiAgentDto, @Request() req) {
    const agent = await this.aiagentsService.findOne(id);
    if (!agent || agent.owner.id !== req.user.id) {
      throw new Error('Unauthorized');
    }
    return this.aiagentsService.update(id, updateAiAgentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const agent = await this.aiagentsService.findOne(id);
    if (!agent || agent.owner.id !== req.user.id) {
      throw new Error('Unauthorized');
    }
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
