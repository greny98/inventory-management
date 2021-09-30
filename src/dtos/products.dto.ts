import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  public categoryId: number;

  @IsString()
  public name: string;

  @IsNumber()
  public purchasePrice: number;

  @IsNumber()
  public price: number;
}
