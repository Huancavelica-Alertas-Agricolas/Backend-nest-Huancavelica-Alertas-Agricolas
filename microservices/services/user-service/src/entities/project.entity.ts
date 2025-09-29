import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./user.entity";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ej: "Papa Andina - Huancavelica"

  @Column()
  location: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];
}