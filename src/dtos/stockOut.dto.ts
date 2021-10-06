import { ICustomer } from '@/interfaces/customers.interface';
import { IProduct } from '@/interfaces/products.interface';
import { IsArray, IsDate, IsNumber, IsObject } from 'class-validator';

export class CreateStockOutDto {
  @IsNumber()
  public customerId: number;

  @IsDate()
  public createdAt: Date;
}

export class CreateStockOutBodyDto {
  @IsObject()
  customer: ICustomer;

  @IsArray()
  products: {
    product: IProduct;
    quantity: number;
  }[];

  @IsNumber()
  discount?: number;
}
