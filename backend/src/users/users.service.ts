import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: User['id']): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: User['email']): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  findBySkill(skillId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skill')
      .where('skill.id = :skillId', { skillId })
      .getMany();
  }

  findByService(serviceId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.services', 'service')
      .where('service.id = :serviceId', { serviceId })
      .getMany();
  }

  findByOwnedProject(projectId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.projects', 'project')
      .where('project.id = :projectId', { projectId })
      .getMany();
  }

  create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: User['id'], user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: User['id']): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return;

    user.firstName = 'Anonymized';
    user.lastName = 'User';
    user.email = `anonymized_${id}@example.com`;
    user.password = '';
    user.isVerified = false;
    user.isServiceProvider = false;
    user.availableToken = 0;

    await this.userRepository.save(user);
  }

  async addSkillToUser(
    userId: User['id'],
    skillId: string,
  ): Promise<User | null> {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(userId)
      .add(skillId);
    return await this.findOne(userId);
  }

  async removeSkillFromUser(
    userId: User['id'],
    skillId: string,
  ): Promise<User | null> {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(userId)
      .remove(skillId);
    return await this.findOne(userId);
  }
}
