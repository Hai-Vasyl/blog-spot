import { registerAs } from '@nestjs/config';

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default registerAs('database', (): MysqlConnectionOptions => {
  const { env } = process;

  return {
    type: 'mysql',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: Boolean(env.DB_SYNC),
  };
});
