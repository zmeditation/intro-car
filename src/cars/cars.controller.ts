import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

// Un controlador es el que se encarga de escuchar las peticiones http de los clientes
// y emitir respuestas http
@Controller('cars')
export class CarsController {
  // La inyeccion de dependencias se usa para inyectar un servicio en un controlador
  // es básicamente pasarle una instancia de un servicio a un controlador a través del constructor
  constructor(private readonly carsService: CarsService) {}
  // El decorador @Get() indica que este metodo se ejecutara cuando se haga una peticion
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarsById(@Param('id', ParseIntPipe) id: number) {
    // El decorador @Param() indica que el parametro id se obtendra desde la peticion http
    // ParseIntPipe es un pipe que se encarga de convertir el parametro id a un numero, por defecto
    // todo los parametros que se reciben en las peticiones http son de tipo string
    return this.carsService.findById(id);
  }
  // El decorador @Post() se usa para enviar información al backend
  // Se usa generalmente para crear un recurso
  @Post()
  createCar(@Body() body: any) {
    // El decorador @Body() se usa para obtener la informacion contenida en el body de la peticion http
    return this.carsService.create(body);
  }

  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return this.carsService.update(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.delete(id);
  }
}
