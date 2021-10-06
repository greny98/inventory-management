import { ICustomer } from './customers.interface';
import { IProduct } from './products.interface';

export interface IStockOut {
  id?: number;
  customerId?: number;
  createdAt: Date;
}

export interface ICreateStockOutBody {
  stockInId: number;
  customer: ICustomer;
  products: {
    product: IProduct;
    quantity: number;
  }[];
  discount?: number;
}

export interface IGetAllStockOut {
  page?: number;
}
