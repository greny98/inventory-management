import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CustomersController from '@controllers/customers.controller';
import { CreateCustomerDto } from '@dtos/customers.dto';

class CustomersRoute implements Routes {
  public path = '/customers';
  public router = Router();
  public customersController = new CustomersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all customers pagination
    this.router.get(`${this.path}`, this.customersController.getAllCustomers);
    // Search via phone
    this.router.get(`${this.path}/search`, this.customersController.searchCustomer);
    // Create customer
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateCustomerDto, 'body'),
      this.customersController.createCustomer,
    );
  }
}

export default CustomersRoute;
