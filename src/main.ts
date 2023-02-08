import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EveryHttpExceptionFilter } from './shared/filters/every-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error'],
  });
  app.useGlobalFilters(new EveryHttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
