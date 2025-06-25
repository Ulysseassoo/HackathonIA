import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  findOne(id: Skill['id']): Promise<Skill | null> {
    return this.skillRepository.findOneBy({ id });
  }

  findByName(name: Skill['name']): Promise<Skill | null> {
    return this.skillRepository.findOneBy({ name });
  }

  create(skill: Partial<Skill>): Promise<Skill> {
    return this.skillRepository.save(skill);
  }

  async update(id: Skill['id'], skill: Partial<Skill>): Promise<Skill | null> {
    await this.skillRepository.update(id, skill);
    return this.findOne(id);
  }

  async remove(id: Skill['id']): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
