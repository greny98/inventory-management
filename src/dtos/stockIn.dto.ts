import { IsNumber, IsDate } from 'class-validator';

export class CreateStockInDto {
  @IsNumber()
  public distributorId: number;

  @IsDate()
  public createdAt: Date;
}
