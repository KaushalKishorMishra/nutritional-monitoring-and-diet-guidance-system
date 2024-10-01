import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class FoodDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  serving_size: string;

  @Column({ type: "text" })
  calories: string;

  @Column({ type: "text" })
  total_fat: string;

  @Column({ type: "text" })
  saturated_fat: string;

  @Column({ type: "text" })
  cholesterol: string;

  @Column({ type: "text" })
  sodium: string;

  @Column({ type: "text" })
  choline: string;

  @Column({ type: "text" })
  folate: string;

  @Column({ type: "text" })
  folic_acid: string;

  @Column({ type: "text" })
  niacin: string;

  @Column({ type: "text" })
  pantothenic_acid: string;

  @Column({ type: "text" })
  riboflavin: string;

  @Column({ type: "text" })
  thiamin: string;

  @Column({ type: "text" })
  vitamin_a: string;

  @Column({ type: "text" })
  vitamin_a_rae: string;

  @Column({ type: "text" })
  carotene_alpha: string;

  @Column({ type: "text" })
  carotene_beta: string;

  @Column({ type: "text" })
  cryptoxanthin_beta: string;

  @Column({ type: "text" })
  lutein_zeaxanthin: string;

  @Column({ type: "text" })
  lucopene: string;

  @Column({ type: "text" })
  vitamin_b12: string;

  @Column({ type: "text" })
  vitamin_b6: string;

  @Column({ type: "text" })
  vitamin_c: string;

  @Column({ type: "text" })
  vitamin_d: string;

  @Column({ type: "text" })
  vitamin_e: string;

  @Column({ type: "text" })
  tocopherol_alpha: string;

  @Column({ type: "text" })
  vitamin_k: string;

  @Column({ type: "text" })
  calcium: string;

  @Column({ type: "text" })
  copper: string;

  @Column({ type: "text" })
  iron: string;

  @Column({ type: "text" })
  magnesium: string;

  @Column({ type: "text" })
  manganese: string;

  @Column({ type: "text" })
  phosphorous: string;

  @Column({ type: "text" })
  potassium: string;

  @Column({ type: "text" })
  selenium: string;

  @Column({ type: "text" })
  zinc: string;

  @Column({ type: "text" })
  protein: string;

  @Column({ type: "text" })
  alanine: string;

  @Column({ type: "text" })
  arginine: string;

  @Column({ type: "text" })
  aspartic_acid: string;

  @Column({ type: "text" })
  cystine: string;

  @Column({ type: "text" })
  glutamic_acid: string;

  @Column({ type: "text" })
  glycine: string;

  @Column({ type: "text" })
  histidine: string;

  @Column({ type: "text" })
  hydroxyproline: string;

  @Column({ type: "text" })
  isoleucine: string;

  @Column({ type: "text" })
  leucine: string;

  @Column({ type: "text" })
  lysine: string;

  @Column({ type: "text" })
  methionine: string;

  @Column({ type: "text" })
  phenylalanine: string;

  @Column({ type: "text" })
  proline: string;

  @Column({ type: "text" })
  serine: string;

  @Column({ type: "text" })
  threonine: string;

  @Column({ type: "text" })
  tryptophan: string;

  @Column({ type: "text" })
  tyrosine: string;

  @Column({ type: "text" })
  valine: string;

  @Column({ type: "text" })
  carbohydrate: string;

  @Column({ type: "text" })
  fiber: string;

  @Column({ type: "text" })
  sugars: string;

  @Column({ type: "text" })
  fructose: string;

  @Column({ type: "text" })
  galactose: string;

  @Column({ type: "text" })
  glucose: string;

  @Column({ type: "text" })
  lactose: string;

  @Column({ type: "text" })
  maltose: string;

  @Column({ type: "text" })
  sucrose: string;

  @Column({ type: "text" })
  fat: string;

  @Column({ type: "text" })
  saturated_fatty_acids: string;

  @Column({ type: "text" })
  monounsaturated_fatty_acids: string;

  @Column({ type: "text" })
  polyunsaturated_fatty_acids: string;

  @Column({ type: "text" })
  fatty_acids_total_trans: string;

  @Column({ type: "text" })
  alcohol: string;

  @Column({ type: "text" })
  ash: string;

  @Column({ type: "text" })
  caffeine: string;

  @Column({ type: "text" })
  theobromine: string;

  @Column({ type: "text" })
  water: string;
}
