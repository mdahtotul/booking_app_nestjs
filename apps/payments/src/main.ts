import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<string>('PORT');

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();

  console.log(`🚨 Payment  microservice is running on TCP port:${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
