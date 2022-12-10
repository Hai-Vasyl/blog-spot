import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const { env } = process;

  return {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: ['**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  };
});
