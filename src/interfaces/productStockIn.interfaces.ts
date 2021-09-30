export interface IProductStockIn {
  id: number;
  prodId: number;
  billId: number;
  quantity: number;
  discount: number;
  createdAt: Date;
}
