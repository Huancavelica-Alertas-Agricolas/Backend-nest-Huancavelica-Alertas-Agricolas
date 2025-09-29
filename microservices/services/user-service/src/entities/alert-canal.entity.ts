import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Alerta } from "./alerta.entity";

export enum TipoCanal {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook'
}

export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  ENVIADO = 'enviado',
  FALLIDO = 'fallido',
  ENTREGADO = 'entregado'
}

@Entity("alert_canal")
export class AlertCanal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alertaId: number;

  @Column({
    type: 'enum',
    enum: TipoCanal
  })
  canal: TipoCanal;

  @Column()
  destinatario: string; // email, número de teléfono, etc.

  @Column({
    type: 'enum',
    enum: EstadoEnvio,
    default: EstadoEnvio.PENDIENTE
  })
  estado: EstadoEnvio;

  @Column({ type: 'timestamp', nullable: true })
  fechaEnvio: Date;

  @Column({ type: 'text', nullable: true })
  mensajeError: string;

  @Column({ type: 'json', nullable: true })
  metadatos: any; // Para almacenar información adicional del envío

  @ManyToOne(() => Alerta, (alerta) => alerta.canales)
  @JoinColumn({ name: 'alertaId' })
  alerta: Alerta;

  @CreateDateColumn()
  createdAt: Date;
}