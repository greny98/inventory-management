import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CategoryController from '@/controllers/categories.controller';
import { CreateCategoryDto } from '@/dtos/categories.dto';

class CategoriesRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateCategoryDto, 'body'),
      this.categoryController.createCategory,
    );
  }
}

export default CategoriesRoute;
