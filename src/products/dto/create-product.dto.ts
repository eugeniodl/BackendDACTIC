
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  costo: number;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ required: false, default: true })
  status?: boolean;
}
