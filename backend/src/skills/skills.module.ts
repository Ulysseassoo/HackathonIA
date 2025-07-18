import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
