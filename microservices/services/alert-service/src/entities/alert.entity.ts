import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";

export enum TipoAlerta {
  LLUVIA = 'lluvia',
  TEMPERATURA = 'temperatura',
  HELADA = 'helada',
  SEQUIA = 'sequia',
  VIENTO = 'viento'
}

export enum EstadoAlerta {
  ACTIVA = 'activa',
  ENVIADA = 'enviada',
  CANCELADA = 'cancelada',
  EXPIRADA = 'expirada'
}

@Entity("alerts")
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TipoAlerta,
    default: TipoAlerta.LLUVIA
  })
  type: TipoAlerta;

  @Column({
    type: 'enum',
    enum: EstadoAlerta,
    default: EstadoAlerta.ACTIVA
  })
  status: EstadoAlerta;

  @Column()
  stationId: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'json', nullable: true })
  params: any;

  // Use a runtime require to avoid circular import issues at module-resolution time.
  @OneToMany(() => require('./alert-canal.entity').AlertCanal, (alertCanal: any) => alertCanal.alert)
  // Keep the property loosely typed to prevent TypeScript from trying to resolve the type
  // during compilation (which can trigger circular resolution errors).
  channels: any[];

  @CreateDateColumn()
  createdAt: Date;
}
