import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import type { Alert } from "./alert.entity";

export enum TipoCanal {
  TELEGRAM = 'telegram',
  GMAIL = 'gmail',
  SMS = 'sms'
}

export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  ENVIADO = 'enviado',
  FALLIDO = 'fallido',
  ENTREGADO = 'entregado'
}

@Entity("alert_channels")
export class AlertCanal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alertId: number;

  @Column({
    type: 'enum',
    enum: TipoCanal
  })
  channel: TipoCanal;

  @Column()
  recipient: string;

  @Column({
    type: 'enum',
    enum: EstadoEnvio,
    default: EstadoEnvio.PENDIENTE
  })
  status: EstadoEnvio;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @Column({ type: 'json', nullable: true })
  metadata: any;

  @ManyToOne(() => require('./alert.entity').Alert, (alert) => alert.channels)
  @JoinColumn({ name: 'alertId' })
  alert: Alert;

  @CreateDateColumn()
  createdAt: Date;
}
