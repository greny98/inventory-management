import { IsNumber, IsDate, IsArray, IsObject } from 'class-validator';
import { IDistributor } from '@interfaces/distributors.interface';
import { IProduct } from '@interfaces/products.interface';

export class CreateStockInDto {
  @IsNumber()
  public distributorId: number;

  @IsDate()
  public createdAt: Date;
}

export class CreateStockInBodyDto {
  @IsObject()
  distributor: IDistributor;

  @IsArray()
  products: {
    product: IProduct;
    quantity: number;
  }[];

  @IsNumber()
  discount?: number;
}
