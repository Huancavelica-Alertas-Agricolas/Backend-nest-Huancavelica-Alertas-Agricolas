import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropProjectsTables1760213000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop relation table first, then projects
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.usuarios_projects_projects CASCADE;`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS public.projects CASCADE;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate projects table
    await queryRunner.query(`CREATE TABLE public.projects (
      id serial PRIMARY KEY,
      name character varying NOT NULL,
      location character varying,
      description text
    );`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS public.projects_id_seq OWNED BY public.projects.id;`,
    );

    // Recreate relation table
    await queryRunner.query(`CREATE TABLE public.usuarios_projects_projects (
      usuarios_id integer NOT NULL,
      projects_id integer NOT NULL,
      CONSTRAINT PK_usuarios_projects PRIMARY KEY (usuarios_id, projects_id)
    );`);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS IDX_usuarios_projects_usuarios_id ON public.usuarios_projects_projects (usuarios_id);`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS IDX_usuarios_projects_projects_id ON public.usuarios_projects_projects (projects_id);`,
    );
    await queryRunner.query(
      `ALTER TABLE public.usuarios_projects_projects ADD CONSTRAINT FK_usuarios_projects_users FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE public.usuarios_projects_projects ADD CONSTRAINT FK_usuarios_projects_projects FOREIGN KEY (projects_id) REFERENCES public.projects(id);`,
    );
  }
}
