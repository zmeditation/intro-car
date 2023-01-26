import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto ';

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
  getCarsById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    // El decorador @Param() indica que el parametro id se obtendra desde la peticion http
    // El pipe ParseUUIDPipe se usa para convertir el parametro id a un UUID, podemos indicar la version tambien
    // ParseIntPipe es un pipe que se encarga de convertir el parametro id a un numero, por defecto
    // todo los parametros que se reciben en las peticiones http son de tipo string
    return this.carsService.findById(id);
  }
  // El decorador @Post() se usa para enviar información al backend
  // Se usa generalmente para crear un recurso
  @Post()
  createCar(@Body() createCarDTO: CreateCarDTO) {
    // El decorador @Body() se usa para obtener la informacion contenida en el body de la peticion http
    return this.carsService.create(createCarDTO);
  }

  // El decorador @Patch() se usa para actualizar un recurso, a diferencia
  // de @Post() que se usa para crear un recurso, @Patch() solo actualiza una parte del recurso
  @Patch(':id')
  updateCar(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCarDto: UpdateCarDTO,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  // El decorador @Delete() se usa para eliminar un recurso
  @Delete(':id')
  deleteCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.delete(id);
  }
}
