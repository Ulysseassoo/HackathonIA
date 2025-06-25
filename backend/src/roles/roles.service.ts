import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: Role['id']): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  findByName(name: Role['name']): Promise<Role | null> {
    return this.roleRepository.findOneBy({ name });
  }

  create(role: Partial<Role>): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(id: Role['id'], role: Partial<Role>): Promise<Role | null> {
    await this.roleRepository.update(id, role);
    return this.findOne(id);
  }

  async remove(id: Role['id']): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
