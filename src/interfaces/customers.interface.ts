export interface ICustomer {
  id?: number;
  name: string;
  phone: string;
  address: string;
}

export interface IGetAllCustomers {
  page?: number;
}

export interface ISearchCustomers {
  phone: string;
}
