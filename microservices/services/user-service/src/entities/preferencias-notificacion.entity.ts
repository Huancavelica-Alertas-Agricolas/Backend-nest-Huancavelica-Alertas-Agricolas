import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum TipoCanal {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push'
}

@Entity("preferencias_notificacion")
export class PreferenciasNotificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column({
    type: 'enum',
    enum: TipoCanal
  })
  canal: TipoCanal;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  configuracion: string; // JSON string para configuraciones específicas

  @Column({ type: 'time', nullable: true })
  horaInicio: string; // Hora de inicio para recibir notificaciones

  @Column({ type: 'time', nullable: true })
  horaFin: string; // Hora de fin para recibir notificaciones

  @Column({ type: 'simple-array', nullable: true })
  diasSemana: string[]; // ['lunes', 'martes', etc.]

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}