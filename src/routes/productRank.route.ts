import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProductRankController from '@/controllers/productRank.controller';

class ProductRankRoute implements Routes {
  public path = '/product_rank';
  public router = Router();
  public productRankController = new ProductRankController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productRankController.getAllProductRank);
  }
}

export default ProductRankRoute;
