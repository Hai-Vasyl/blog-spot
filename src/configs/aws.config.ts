import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => {
  const { env } = process;

  return {
    id: env.AWS_ID,
    secret: env.AWS_SECRET,
    bucket: env.AWS_BUCKET,
    region: env.AWS_REGION,
  };
});
