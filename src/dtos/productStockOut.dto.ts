import { IsNumber } from 'class-validator';

export class CreateProductStockOutDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  stockOutId: number;
  @IsNumber()
  quantity: number;
  @IsNumber()
  discount: number;
}
