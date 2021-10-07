import { IsNumber } from 'class-validator';

export class CreateProductRankDto {
  @IsNumber()
  public productId: number;
  @IsNumber()
  public month: number;
  @IsNumber()
  public year: number;
  @IsNumber()
  public quantity: number;
}
