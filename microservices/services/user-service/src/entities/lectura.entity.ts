import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Estacion } from "./estacion.entity";

@Entity("lecturas")
export class Lectura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estacionId: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tempMax: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tempMin: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  lluviaMm: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  humedad: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  presion: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  velocidadViento: number;

  @Column({ nullable: true })
  direccionViento: string;

  @ManyToOne(() => Estacion, (estacion) => estacion.lecturas)
  @JoinColumn({ name: 'estacionId' })
  estacion: Estacion;

  @CreateDateColumn()
  createdAt: Date;
}