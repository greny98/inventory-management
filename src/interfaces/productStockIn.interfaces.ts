export interface IProductStockIn {
  id?: number;
  productId?: number;
  stockInId?: number;
  quantity: number;
  discount: number;
  createdAt?: Date;
}
