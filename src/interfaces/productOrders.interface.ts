export interface IProductOrder {
  id: number;
  prodId: number;
  orderId: number;
  quantity: number;
  discount: number;
  createdAt: Date;
}
