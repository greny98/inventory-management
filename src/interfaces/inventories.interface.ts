export interface IInventory {
  id?: number;
  productId?: number;
  quantity: number;
  // lastUpdatedAt: Date;
}

export interface IGetAllInventories {
  page?: number;
}
