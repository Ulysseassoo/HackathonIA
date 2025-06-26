import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './skills/skills.module';
import { AiagentsModule } from './aiagents/aiagents.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { AgentsModule } from './agents/agents.module';
import { ConversationsController } from './conversations/conversations.controller';
import { ConversationsService } from './conversations/conversations.service';
import { ConversationsModule } from './conversations/conversations.module';

console.log(process.env.POSTGRES_PORT);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    UtilsModule,
    SkillsModule,
    AiagentsModule,
    ProjectsModule,
    AgentsModule,
    ConversationsModule,
  ],
  controllers: [AppController, ConversationsController],
  providers: [AppService, ConversationsService],
})
export class AppModule {}
