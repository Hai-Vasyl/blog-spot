import { registerAs } from '@nestjs/config';

export default registerAs('common', () => {
  const { env } = process;

  return {
    port: env.PORT,
  };
});
