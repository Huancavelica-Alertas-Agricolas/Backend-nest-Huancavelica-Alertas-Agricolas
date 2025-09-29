import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum TipoCanal {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WHATSAPP = 'whatsapp'
}

export enum TipoAlerta {
  LLUVIA = 'lluvia',
  TEMPERATURA = 'temperatura',
  HELADA = 'helada',
  SEQUIA = 'sequia',
  VIENTO = 'viento',
  TODAS = 'todas'
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

  @Column({
    type: 'enum',
    enum: TipoAlerta,
    default: TipoAlerta.TODAS
  })
  tipoAlerta: TipoAlerta;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  destinatario: string; // email, número de teléfono, etc.

  @Column({ type: 'json', nullable: true })
  configuracion: any; // Configuraciones específicas del canal

  @Column({ type: 'time', nullable: true })
  horaInicio: string; // Hora de inicio para recibir notificaciones

  @Column({ type: 'time', nullable: true })
  horaFin: string; // Hora de fin para recibir notificaciones

  @Column({ type: 'simple-array', nullable: true })
  diasSemana: string[]; // ['lunes', 'martes', etc.]

  // Configuraciones adicionales para el frontend
  @Column({ default: true })
  alertasInmediatas: boolean; // Alertas críticas inmediatas

  @Column({ default: false })
  resumenDiario: boolean; // Resumen diario de actividad

  @Column({ default: false })
  reporteSemanal: boolean; // Reporte semanal

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}