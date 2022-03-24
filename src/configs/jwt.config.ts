import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const { env } = process;

  return {
    secret: env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  };
});
