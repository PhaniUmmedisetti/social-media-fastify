/* eslint-disable @typescript-eslint/no-unused-vars */
/// Entity for user table
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post';
import { Comment } from './comment';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({
    unique: true,
  })
  email?: string;

  /// One user can have many posts
  @OneToMany(() => Post, (post) => post.user)
  post?: Post[];

  // One user can create many comments
  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
