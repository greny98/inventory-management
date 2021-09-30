export interface IProductStockOut {
  id: number;
  prodId: number;
  orderId: number;
  quantity: number;
  discount: number;
  createdAt: Date;
}
