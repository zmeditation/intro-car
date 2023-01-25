import { Injectable, NotFoundException } from '@nestjs/common';

// Un servicio es una clase que se encarga de realizar operaciones especificas
// y que puede ser inyectada en otros componentes
// Se encarga de la logica de negocio
@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Ford',
      model: 'Fiesta',
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'Camaro',
    },
    {
      id: 3,
      brand: 'Toyota',
      model: 'Corolla',
    },
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`El carro con el id '${id}' no existe`);
      // Existen diferentes tipos de excepciones, en este caso se esta usando la excepcion
      // NotFoundException, que es una excepcion que se usa para indicar que un recurso no fue encontrado
    }
    return car;
  }

  public create(body: any) {
    // Se crea un nuevo id en base al id del ultimo carro mas 1
    const id = this.cars[this.cars.length - 1].id + 1;
    // Se crea un nuevo carro con el id creado y el resto de la informacion contenida en el body
    const car = {
      id,
      ...body,
    };
    // Se agrega el nuevo carro al arreglo de carros
    this.cars.push(car);
    return car;
  }

  public update(id: number, body: any) {
    // Se usa el metodo findById para obtener el carro con el id especificado
    const car = this.findById(id);
    // Se actualiza la informacion del carro con la nueva informacion contenida en el body
    car.brand = body.brand;
    car.model = body.model;
    if (!car) {
      throw new NotFoundException(`El carro con el id '${id}' no existe`);
    }
    return car;
  }

  public delete(id: number) {
    // Se usa el metodo findById para obtener el carro con el id especificado
    const car = this.findById(id);
    // Se seleccina el indice del carro en el arreglo de carros
    const index = this.cars.indexOf(car);
    // Se elimina el carro del arreglo de carros
    this.cars.splice(index, 1);
    return car;
  }
}
