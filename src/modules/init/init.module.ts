import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from '@/configs/database.config';
import jwtConfig from '@/configs/jwt.config';
import winstonConfig from '@/configs/winston.config';
import commonConfig from '@/configs/common.config';
import awsConfig from '@/configs/aws.config';
import googleConfig from '@/configs/google.config';
import { LoggerModule } from '@/shared/modules/logger/logger.module';

export const initModules = [
  ConfigModule.forRoot({
    envFilePath: 'configs/.env',
    load: [
      databaseConfig,
      jwtConfig,
      winstonConfig,
      commonConfig,
      awsConfig,
      googleConfig,
    ],
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) =>
      configService.get('database'),
    inject: [ConfigService],
  }),
  WinstonModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('winston'),
    inject: [ConfigService],
  }),
  LoggerModule,
];
