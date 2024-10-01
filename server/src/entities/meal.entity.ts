import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class MealEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodName: string;

  @Column()
  quantityValue: number;

  @Column()
  quantityMeasurement: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}
