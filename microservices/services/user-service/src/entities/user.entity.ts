import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
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

  // alertas, logs and preferencias are now owned by their respective services.
  // Keep lightweight references (ids) if needed, avoid importing entities from other services.
  @Column('int', { nullable: true })
  ultimaAlertaId?: number;

  @Column('int', { nullable: true })
  ultimoLogId?: number;

  @Column({ nullable: true })
  preferenciasNotificacionSummary?: string; // JSON or brief summary, stored locally if needed

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
