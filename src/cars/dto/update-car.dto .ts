import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
// Un DTO es un objeto de transferencia de datos
// se usa para definir la estructura de los datos que se reciben en las peticiones http
// y los datos que se envian en las respuestas http
// Los DTO siempre son clases
// Debmos usar las blibliotecas de class-validator y class-transformer
// para vañidar los datos que se reciben en las peticiones http
export class UpdateCarDTO {
  @IsString()
  @IsUUID() // El decorador @IsUUID() indica que el campo id debe ser un UUID
  @IsOptional() // El decorador @IsOptional() indica que el campo id es opcional
  readonly id: string;
  @IsString() // El decorador @IsString() indica que el campo brand debe ser un string
  @IsOptional()
  readonly brand: string; /// Es buena practica usar readonly para que los campos no se puedan modificar una vez que se crean
  @IsString()
  @MinLength(3) // El decorador @MinLength() indica que el campo model debe tener al menos 3 caracteres
  @IsOptional()
  readonly model: string;
}
