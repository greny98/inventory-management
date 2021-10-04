import { IsNumber } from 'class-validator';

export class CreateProductStockInDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  stockInId: number;
  @IsNumber()
  quantity: number;
  @IsNumber()
  discount: number;
}
