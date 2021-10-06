import { IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  public productId: number;
  @IsNumber()
  public quantity: number;
}

export class updateInventoryDto {
  @IsNumber()
  public productId: number;
  @IsNumber()
  public quantity: number;
}
