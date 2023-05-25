/* eslint-disable @typescript-eslint/no-unused-vars */

/// Entity for post table
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from './user';
import { Comment } from './comment';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  /// Many posts can be associated to one user.
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({
    name: 'user_id',
  })
  user?: User;

  // One post can have many comments
  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}
