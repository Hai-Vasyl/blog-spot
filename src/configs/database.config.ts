import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  const { env } = process;

  return {
    uri: env.DATABASE_URI,
  };
});
