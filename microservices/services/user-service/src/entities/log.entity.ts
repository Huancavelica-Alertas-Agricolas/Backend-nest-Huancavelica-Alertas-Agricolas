import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { AlertCanal } from "./alert-canal.entity";

export enum TipoLog {
  ALERTA_CREADA = 'alerta_creada',
  ALERTA_ENVIADA = 'alerta_enviada',
  ALERTA_CANCELADA = 'alerta_cancelada',
  ERROR_ENVIO = 'error_envio',
  LECTURA_RECIBIDA = 'lectura_recibida',
  SISTEMA = 'sistema'
}

export enum EstadoLog {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

@Entity("logs")
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column({ nullable: true })
  alertaCanalId: number;

  @Column({
    type: 'enum',
    enum: TipoLog
  })
  tipo: TipoLog;

  @Column({
    type: 'enum',
    enum: EstadoLog,
    default: EstadoLog.INFO
  })
  status: EstadoLog;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'json', nullable: true })
  metadatos: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deliveredAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @ManyToOne(() => AlertCanal, { nullable: true })
  @JoinColumn({ name: 'alertaCanalId' })
  alertaCanal: AlertCanal;

  @CreateDateColumn()
  createdAt: Date;
}