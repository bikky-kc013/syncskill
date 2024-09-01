import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as path from 'path';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    try {
      const option: TypeOrmModuleOptions = {
        type: configService.get<'mysql' | 'postgres' | 'sqlite'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        database: configService.get<string>('DB_DATABASE'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [path.join(__dirname, '../../app/**/*.entity.{ts,js}')],
        synchronize: true,
      };
      return option;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
