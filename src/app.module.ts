import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';

// Un modulo agrupa y desacopla un conjunto de funcionalidades especificas
// El modulo app es el modulo principal el cual tiene las referencias a otros modulos y servicios
// Básicamente este archivo es una clase con un decorador @Module el cual indica cuales
//  son las importaciones, controladores, proveedores y exportaciones de este modulo
@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
