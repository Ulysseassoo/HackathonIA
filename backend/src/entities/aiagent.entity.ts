import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Project } from './project.entity';

@Entity()
export class AIAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Skill, (skill) => skill.aiAgents)
  @JoinTable()
  skills: Skill[];

  @ManyToMany(() => Project, (project) => project.aiAgents)
  @JoinTable()
  projects: Project[];
}
