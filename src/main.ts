import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { AppService } from '@/app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const result = await app.get(AppService).run();
  console.log(result);
}

bootstrap();
