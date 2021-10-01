import CustomerService from '@services/customers.service';
import { RequestHandler } from 'express';
import { CreateCustomerDto, SearchCustomerDto } from '@dtos/customers.dto';
import { ICustomer, IGetAllCustomers, ISearchCustomers } from '@interfaces/customers.interface';

class CustomersController {
  public customerService = new CustomerService();

  public getAllCustomers: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllCustomers;
      const customers: ICustomer[] = await this.customerService.getAllCustomers(page);
      res.status(201).json({ data: { customers } });
    } catch (error) {
      next(error);
    }
  };

  public searchCustomer: RequestHandler<any, any, ISearchCustomers, any> = async (req, res, next) => {
    try {
      const customerQuery: SearchCustomerDto = req.query;
      const customer = await this.customerService.searchCustomer(customerQuery.phone);
      res.json({ data: { customer } });
    } catch (error) {
      next(error);
    }
  };

  public createCustomer: RequestHandler = async (req, res, next) => {
    try {
      const customerData: CreateCustomerDto = req.body;
      const createCustomerData: ICustomer = await this.customerService.createCustomer(customerData);
      res.status(201).json({ data: createCustomerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomersController;
