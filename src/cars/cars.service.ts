import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto ';

// Un servicio es una clase que se encarga de realizar operaciones especificas
// y que puede ser inyectada en otros componentes
// Se encarga de la logica de negocio
@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      // Un UUID es un identificador unico universal, es un identificador que se usa para
      // generar un identificador unico para cada recurso
      id: uuid(),
      brand: 'Ford',
      model: 'Fiesta',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Camaro',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`El carro con el id '${id}' no existe`);
      // Existen diferentes tipos de excepciones, en este caso se esta usando la excepcion
      // NotFoundException, que es una excepcion que se usa para indicar que un recurso no fue encontrado
    }
    return car;
  }

  public update(id: string, updateCarDto: UpdateCarDTO) {
    // Se usa el metodo findById para obtener el carro con el id especificado
    let carDB = this.findById(id);
    if (updateCarDto.id && updateCarDto.id !== id) {
      // Se verifica que el id del body sea igual al id del carro
      throw new BadRequestException(
        `El id del carro no coincide con el id del body`,
      );
    }
    // Se actualiza la informacion del carro con la nueva informacion contenida en el body
    this.cars = this.cars.map((car) => {
      // Se usa el metodo map para iterar sobre el arreglo de carros
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  public delete(id: string) {
    // Se usa el metodo findById para obtener el carro con el id especificado
    const car = this.findById(id);
    if (!car) {
      throw new NotFoundException(`El carro con el id '${id}' no existe`);
    }
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  public create(createCarDto: CreateCarDTO) {
    // Se crea un nuevo carro con la informacion contenida en el DTO
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    // Se agrega el nuevo carro al arreglo de carros
    this.cars.push(newCar);
    return newCar;
  }
}
