import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '@/configs/database.config';
import jwtConfig from '@/configs/jwt.config';

export const initModules = [
  ConfigModule.forRoot({
    envFilePath: 'configs/.env',
    load: [databaseConfig, jwtConfig],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) =>
      configService.get('database'),
    inject: [ConfigService],
  }),
];
