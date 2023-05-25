/* eslint-disable @typescript-eslint/no-unused-vars */
/// Entity for column table
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Post } from './post';
import { User } from './user';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  text?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post?: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
