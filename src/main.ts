import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// El archivo main.ts es el punto de entrada de la aplicacion, es lo que se ejecuta primero al iniciar la aplicacion
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
