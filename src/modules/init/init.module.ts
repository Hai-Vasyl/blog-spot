import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

import databaseConfig from '@/configs/database.config';
import jwtConfig from '@/configs/jwt.config';
import winstonConfig from '@/configs/winston.config';
import commonConfig from '@/configs/common.config';
import awsConfig from '@/configs/aws.config';

export const initModules = [
  ConfigModule.forRoot({
    envFilePath: 'configs/.env',
    load: [databaseConfig, jwtConfig, winstonConfig, commonConfig, awsConfig],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) =>
      configService.get('database'),
    inject: [ConfigService],
  }),
  WinstonModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('winston'),
    inject: [ConfigService],
  }),
];
