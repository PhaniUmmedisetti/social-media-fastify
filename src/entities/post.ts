import { Entity, 
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany
} from 'typeorm';

import { User } from './User';
import { Comment } from './comment';

@Entity('post')
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  /// Many posts can be associated to one user.
  @ManyToOne(
   () => User,
   user => user.post,
  )
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Column()
  title: string;

   @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(
    () => Comment,
  )
  comments : Comment[]
}
 