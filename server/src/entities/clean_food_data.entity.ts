import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  IsNull,
} from "typeorm";

@Entity()
export class CleanFoodDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("numeric")
  serving_size: number;

  @Column("numeric")
  calories: number;

  @Column("numeric")
  total_fat: number;

  @Column("numeric")
  saturated_fat: number;

  @Column("numeric")
  cholesterol: number;

  @Column("numeric")
  sodium: number;

  @Column("numeric")
  choline: number;

  @Column("numeric")
  vitamin_a: number;

  @Column("numeric")
  vitamin_b12: number;

  @Column("numeric")
  vitamin_b6: number;

  @Column("numeric")
  vitamin_c: number;

  @Column("numeric")
  vitamin_d: number;

  @Column("numeric")
  vitamin_e: number;

  @Column("numeric")
  vitamin_k: number;

  @Column("numeric")
  calcium: number;

  @Column("numeric")
  copper: number;

  @Column("numeric")
  iron: number;

  @Column("numeric")
  magnesium: number;

  @Column("numeric")
  manganese: number;

  @Column("numeric")
  phosphorous: number;

  @Column("numeric")
  potassium: number;

  @Column("numeric")
  zinc: number;

  @Column("numeric")
  protein: number;

  @Column("numeric")
  glutamic_acid: number;

  @Column("numeric")
  glycine: number;

  @Column("numeric")
  carbohydrate: number;

  @Column("numeric")
  fiber: number;

  @Column("numeric")
  sugars: number;

  @Column("numeric")
  fructose: number;

  @Column("numeric")
  galactose: number;

  @Column("numeric")
  glucose: number;

  @Column("numeric")
  lactose: number;

  @Column("numeric")
  maltose: number;

  @Column("numeric")
  sucrose: number;

  @Column("numeric")
  fat: number;

  @Column("numeric", {
    nullable: true,
  })
  saturated_fatty_acids: number;

  @Column("numeric", {
    nullable: true,
  })
  fatty_acids_total_trans: number;

  @Column("numeric")
  alcohol: number;

  @Column("numeric")
  ash: number;

  @Column("numeric")
  caffeine: number;

  @Column("numeric")
  water: number;
}
