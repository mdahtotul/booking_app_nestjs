import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const port = process.env.port ?? 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
