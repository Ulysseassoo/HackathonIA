import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class AIAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  link: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

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

  @ManyToOne(() => User, (user) => user.aiAgents, { nullable: false })
  owner: User;
}
