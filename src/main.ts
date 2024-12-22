import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pone de prefijo el api/...
  app.setGlobalPrefix('api/v2');

  // Definimos la validacion global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina las propiedades extras de la data
    forbidNonWhitelisted: true // Lanza un error cuando se agregan propiedades extras al DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
