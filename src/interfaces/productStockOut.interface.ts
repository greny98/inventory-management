export interface IProductStockOut {
  id?: number;
  productId?: number;
  stockOutId?: number;
  quantity: number;
  discount: number;
  createdAt?: Date;
}
