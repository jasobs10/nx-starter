import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiEnvironment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<ApiEnvironment, true> = app.get(ConfigService);

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    credentials: true,
    origin: [configService.get('webBaseUrl')]
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(3100);
}

bootstrap();
