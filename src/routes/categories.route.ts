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
    // get all categories pagination
    this.router.get(`${this.path}`, this.categoryController.getAllCategories);
    // search category by name
    this.router.get(`${this.path}/search`, this.categoryController.searchCategory);
    // create category
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateCategoryDto, 'body'),
      this.categoryController.createCategory,
    );
    // update category
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateCategoryDto, 'body'),
      this.categoryController.updateCategory,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.categoryController.deleteCategory);
  }
}

export default CategoriesRoute;
