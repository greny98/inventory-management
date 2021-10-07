export interface IProductRank {
  id?: number;
  productId?: number;
  month: number;
  year: number;
  quantity: number;
}

export interface IGetAllProductRank {
  page?: number;
}
