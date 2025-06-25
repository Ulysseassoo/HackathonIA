import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Project } from './project.entity';
import { AIAgent } from './aiagent.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isServiceProvider: boolean;

  @Column({ default: 5 })
  availableToken: number;

  @Column({ default: 0 })
  pricePerDay: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  memberProjects: Project[];

  @OneToMany(() => AIAgent, (aiAgent) => aiAgent.owner)
  aiAgents: AIAgent[];
}
