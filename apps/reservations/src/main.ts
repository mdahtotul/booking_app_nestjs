import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const port = process.env.port ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
