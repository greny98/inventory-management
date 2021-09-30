import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProductsController from '@/controllers/products.controller';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateProductDto, 'body'),
      this.productController.createProduct,
    );
  }
}

export default ProductRoute;
