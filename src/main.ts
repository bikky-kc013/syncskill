import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/filters/exception';
import * as morgan from 'morgan';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  app.use(morgan('dev'));
  app.useGlobalFilters(new HttpExceptionFilter());  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  const config = app.get(ConfigService);
  const PORT = config.get<number>('APP_PORT');
  app.listen(PORT);
  console.log(`Server is listening to Port:${PORT}`);
})();
