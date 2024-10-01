import { Token } from "@/interfaces/tokens.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./users.entity";

@Entity()
export class TokenEntity extends BaseEntity implements Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purpose: string;

  @Column()
  expires_in: Date;

  @Column()
  value: string;

  @ManyToOne(() => UserEntity, (userId) => userId.id, { nullable: false })
  userId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
