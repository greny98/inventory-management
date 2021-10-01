import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import DistributorsController from '@controllers/distributors.controller';
import { CreateDistributorDto } from '@dtos/distributors.dto';

class CustomersRoute implements Routes {
  public path = '/distributors';
  public router = Router();
  public distributorsController = new DistributorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all distributors pagination
    this.router.get(`${this.path}`, this.distributorsController.getAllDistributors);
    // Search via phone
    this.router.get(`${this.path}/search`, this.distributorsController.searchDistributor);
    // Create distributor
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateDistributorDto, 'body'),
      this.distributorsController.createDistributor,
    );
  }
}

export default CustomersRoute;
