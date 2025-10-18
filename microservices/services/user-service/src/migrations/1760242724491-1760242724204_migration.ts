import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchemaMigration1760242724204 implements MigrationInterface {
  name = 'InitSchemaMigration1760242724204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alertas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "mensaje" text NOT NULL, "tipo" "public"."alertas_tipo_enum" NOT NULL DEFAULT 'lluvia', "estado" "public"."alertas_estado_enum" NOT NULL DEFAULT 'activa', "estacionId" integer NOT NULL, "usuarioId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "fechaExpiracion" TIMESTAMP, "parametros" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b474c4021f8d6e4e13383ef1106" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alert_canal" ("id" SERIAL NOT NULL, "alertaId" integer NOT NULL, "canal" "public"."alert_canal_canal_enum" NOT NULL, "destinatario" character varying NOT NULL, "estado" "public"."alert_canal_estado_enum" NOT NULL DEFAULT 'pendiente', "fecha_envio" TIMESTAMP, "mensaje_error" text, "metadatos" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c00912038061f91e8f5c615e505" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "logs" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "alertaCanalId" integer, "tipo" "public"."logs_tipo_enum" NOT NULL, "status" "public"."logs_status_enum" NOT NULL DEFAULT 'info', "mensaje" text NOT NULL, "metadatos" json, "deliveredAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "preferencias_notificacion" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "canal" "public"."preferencias_notificacion_canal_enum" NOT NULL, "activo" boolean NOT NULL DEFAULT true, "configuracion" character varying, "horaInicio" TIME, "horaFin" TIME, "diasSemana" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b64ac87f77bcbf629d881978c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" ADD CONSTRAINT "FK_abe9e8672269d1aa3a73ded2339" FOREIGN KEY ("estacionId") REFERENCES "estaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" ADD CONSTRAINT "FK_df89995a5765a2884753707f1ed" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_canal" ADD CONSTRAINT "FK_4fe415bad3cc91d617b4a171378" FOREIGN KEY ("alertaId") REFERENCES "alertas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_c50da38edd1feba47706acaa50b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_aa69ed518248facf0dc399c9d72" FOREIGN KEY ("alertaCanalId") REFERENCES "alert_canal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "preferencias_notificacion" ADD CONSTRAINT "FK_2e4a8e6894bc5d88cac4cbde21b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "preferencias_notificacion" DROP CONSTRAINT "FK_2e4a8e6894bc5d88cac4cbde21b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_aa69ed518248facf0dc399c9d72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_c50da38edd1feba47706acaa50b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_canal" DROP CONSTRAINT "FK_4fe415bad3cc91d617b4a171378"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" DROP CONSTRAINT "FK_df89995a5765a2884753707f1ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alertas" DROP CONSTRAINT "FK_abe9e8672269d1aa3a73ded2339"`,
    );
    await queryRunner.query(`DROP TABLE "preferencias_notificacion"`);
    await queryRunner.query(`DROP TABLE "logs"`);
    await queryRunner.query(`DROP TABLE "alert_canal"`);
    await queryRunner.query(`DROP TABLE "alertas"`);
  }
}
