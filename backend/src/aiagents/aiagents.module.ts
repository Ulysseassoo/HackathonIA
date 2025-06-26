import { Module } from '@nestjs/common';
import { AiagentsService } from './aiagents.service';
import { AiagentsController } from './aiagents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIAgent } from '../entities/aiagent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AIAgent])],
  providers: [AiagentsService],
  controllers: [AiagentsController],
})
export class AiagentsModule {}
