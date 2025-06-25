import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  findOne(id: Service['id']): Promise<Service | null> {
    return this.serviceRepository.findOneBy({ id });
  }

  findByProvider(providerId: string): Promise<Service[]> {
    return this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.user', 'user')
      .where('user.id = :providerId', { providerId })
      .getMany();
  }

  async findByCategory(categoryId: string): Promise<Service[]> {
    return this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }

  create(service: Partial<Service>): Promise<Service> {
    return this.serviceRepository.save(service);
  }

  async update(
    id: Service['id'],
    service: Partial<Service>,
  ): Promise<Service | null> {
    await this.serviceRepository.update(id, service);
    return this.findOne(id);
  }

  async remove(id: Service['id']): Promise<void> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) return;
    await this.serviceRepository.remove(service);
  }
}
