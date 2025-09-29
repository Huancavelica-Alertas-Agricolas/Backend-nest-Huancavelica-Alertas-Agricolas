import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Estacion } from "./estacion.entity";
import { AlertCanal } from "./alert-canal.entity";

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

@Entity("alertas")
export class Alerta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({
    type: 'enum',
    enum: TipoAlerta,
    default: TipoAlerta.LLUVIA
  })
  tipo: TipoAlerta;

  @Column({
    type: 'enum',
    enum: EstadoAlerta,
    default: EstadoAlerta.ACTIVA
  })
  estado: EstadoAlerta;

  @Column()
  estacionId: number;

  @Column()
  usuarioId: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaExpiracion: Date;

  @Column({ type: 'json', nullable: true })
  parametros: any; // Para almacenar condiciones específicas

  @ManyToOne(() => Estacion)
  @JoinColumn({ name: 'estacionId' })
  estacion: Estacion;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @OneToMany(() => AlertCanal, (alertCanal) => alertCanal.alerta)
  canales: AlertCanal[];

  @CreateDateColumn()
  createdAt: Date;
}