import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// El archivo main.ts es el punto de entrada de la aplicacion, es lo que se ejecuta primero al iniciar la aplicacion
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Se configura de manera global el ValidationPipe para que valide los datos que se reciben en las peticiones http
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelist solo deja pasar los datos que estan definidos en el DTO
      forbidNonWhitelisted: true, // forbidNonWhitelisted no deja pasar los datos que no estan definidos en el DTO
      // y devulve un error 400
    }),
  );

  await app.listen(3000);
}
bootstrap();
