import { registerAs } from '@nestjs/config';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs('database', (): PostgresConnectionOptions => {
  const { env } = process;

  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: +env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: JSON.parse(env.DB_SYNC),
    entities: ['**/*.entity{.ts,.js}'],
    // migrationsTableName: 'migrations',
    // migrations: ['src/migration/*.ts'],
    // cli: {
    //   migrationsDir: 'src/migration',
    // },
  };
});
