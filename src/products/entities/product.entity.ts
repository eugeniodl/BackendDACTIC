
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  costo: number;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
