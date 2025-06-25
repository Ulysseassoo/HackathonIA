import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: Category['id']): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  findByName(name: Category['name']): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ name });
  }

  create(category: Partial<Category>): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(
    id: Category['id'],
    category: Partial<Category>,
  ): Promise<Category | null> {
    await this.categoryRepository.update(id, category);
    return this.findOne(id);
  }

  async remove(id: Category['id']): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
