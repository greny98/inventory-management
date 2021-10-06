export interface IProduct {
  id?: number;
  categoryId?: number;
  name: string;
  purchasePrice: number;
  price: number;
  image?: string;
}

export interface IGetAllProducts {
  page?: number;
  category?: number;
  name?: string;
}
