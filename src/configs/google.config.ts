import { registerAs } from '@nestjs/config';

export default registerAs('google', () => {
  const { env } = process;

  return {
    authGoogleClientID: env.GOOGLE_AUTH_CLIENT_ID,
    authGoogleSecret: env.GOOGLE_AUTH_SECRET,
  };
});
