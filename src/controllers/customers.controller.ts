import CustomerService from '@services/customers.service';
import { RequestHandler } from 'express';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { ICustomer } from '@interfaces/customers.interface';

class CustomersController {
  public customerService = new CustomerService();

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
