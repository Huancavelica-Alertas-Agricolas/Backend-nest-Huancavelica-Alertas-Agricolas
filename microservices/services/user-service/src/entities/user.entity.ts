import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Alerta } from "./alerta.entity";
import { Log } from "./log.entity";
import { PreferenciasNotificacion } from "./preferencias-notificacion.entity";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // Código único del usuario (ej: carnet agricultor)

  @Column()
  nombre: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column()
  ciudad: string; // Localización simple (ej: distrito, provincia)

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Alerta, (alerta) => alerta.usuario)
  alertas: Alerta[];

  @OneToMany(() => Log, (log) => log.usuario)
  logs: Log[];

  @OneToMany(() => PreferenciasNotificacion, (pref) => pref.usuario)
  preferenciasNotificacion: PreferenciasNotificacion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}