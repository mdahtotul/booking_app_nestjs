import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const httpPort = configService.getOrThrow<string>('HTTP_PORT');
  const tcpPort = configService.getOrThrow<string>('TCP_PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: tcpPort,
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(httpPort);

  console.log(`🚨 Auth microservice is running on TCP port:${tcpPort}`);
  console.log(`🚨 Auth service is running on: http://localhost:${httpPort}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
