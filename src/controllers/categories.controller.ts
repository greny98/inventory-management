import { CreateCategoryDto } from '@/dtos/categories.dto';
import { ICategories } from '@/interfaces/categories.interface';
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
}

export default CategoryController;
