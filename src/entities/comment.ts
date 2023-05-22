import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Post } from "./post";

@Entity('comment')
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(
    () => Post
  )

  @JoinTable({
    name : "comment_post",
    joinColumn:{
        name: "comment_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn:{
        name: "post_id",
        referencedColumnName: "id",
    }
  })
  posts : Post[]
   
  
}
