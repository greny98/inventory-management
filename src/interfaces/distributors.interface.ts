export interface IDistributor {
  id?: number;
  name: string;
  phone: string;
  address: string;
  createdAt?: Date;
}

export interface IGetAllDistributors {
  page?: number;
}

export interface ISearchDistributors {
  phone: string;
}
