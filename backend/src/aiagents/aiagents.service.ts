import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIAgent } from '../entities/aiagent.entity';

@Injectable()
export class AiagentsService {
  constructor(
    @InjectRepository(AIAgent)
    private readonly aiAgentRepository: Repository<AIAgent>,
  ) {}

  findAll(): Promise<AIAgent[]> {
    return this.aiAgentRepository.find();
  }

  findOne(id: AIAgent['id']): Promise<AIAgent | null> {
    return this.aiAgentRepository.findOneBy({ id });
  }

  findByName(name: AIAgent['name']): Promise<AIAgent | null> {
    return this.aiAgentRepository.findOneBy({ name });
  }

  findByOwner(ownerId: string): Promise<AIAgent[]> {
    return this.aiAgentRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  findBySkill(skillId: string): Promise<AIAgent[]> {
    return this.aiAgentRepository
      .createQueryBuilder('aiAgent')
      .leftJoinAndSelect('aiAgent.skills', 'skill')
      .where('skill.id = :skillId', { skillId })
      .getMany();
  }

  create(aiAgent: Partial<AIAgent>): Promise<AIAgent> {
    return this.aiAgentRepository.save(aiAgent);
  }

  async update(
    id: AIAgent['id'],
    aiAgent: Partial<AIAgent>,
  ): Promise<AIAgent | null> {
    await this.aiAgentRepository.update(id, aiAgent);
    return this.findOne(id);
  }

  async remove(id: AIAgent['id']): Promise<void> {
    await this.aiAgentRepository.delete(id);
  }

  async addSkillToAgent(
    agentId: AIAgent['id'],
    skillId: string,
  ): Promise<AIAgent | null> {
    await this.aiAgentRepository
      .createQueryBuilder()
      .relation(AIAgent, 'skills')
      .of(agentId)
      .add(skillId);
    return await this.findOne(agentId);
  }

  async removeSkillFromAgent(
    agentId: AIAgent['id'],
    skillId: string,
  ): Promise<AIAgent | null> {
    await this.aiAgentRepository
      .createQueryBuilder()
      .relation(AIAgent, 'skills')
      .of(agentId)
      .remove(skillId);
    return await this.findOne(agentId);
  }
}
