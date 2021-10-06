import { IDistributor } from '@interfaces/distributors.interface';
import { IProduct } from '@interfaces/products.interface';

export interface IStockIn {
  id?: number;
  distributorId?: number;
  createdAt: Date;
}

export interface ICreateStockInBody {
  stockInId: number;
  distributor: IDistributor;
  products: {
    product: IProduct;
    quantity: number;
  }[];
  discount?: number;
}

export interface IGetAllProductStockIn {
  page?: number;
}
