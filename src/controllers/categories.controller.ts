import { CreateCategoryDto, SearchCategoryDto } from '@/dtos/categories.dto';
import { ICategories, IGetAllCategories } from '@/interfaces/categories.interface';
import CategoryService from '@/services/categories.service';
import { RequestHandler } from 'express';

class CategoryController {
  public categoryService = new CategoryService();

  public createCategory: RequestHandler = async (req, res, next) => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCategoryData: ICategories = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllCategories: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllCategories;
      const categories: ICategories[] = await this.categoryService.getAllCategories(page);
      res.status(201).json({ data: { categories } });
    } catch (error) {
      next(error);
    }
  };

  public searchCategory: RequestHandler = async (req, res, next) => {
    try {
      const categoryQuery: SearchCategoryDto = req.body;
      const category: ICategories = await this.categoryService.searchCategory(categoryQuery.name);
      res.json({ data: { category } });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
