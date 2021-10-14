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
      const categories: any[] = await this.categoryService.getAllCategories(page);
      const categoryCount: any = await this.categoryService.getCountAllCategories();

      // Convert Array category to Object Category with key = categoryId
      const objectCategoryCount = categoryCount.reduce(
        (obj, item) => ({
          ...obj,
          [item['categoryId']]: item.dataValues,
        }),
        {},
      );
      // add attribute count for List object category
      const categoriesWithCounting = categories.map(category => {
        return {
          ...category.dataValues,
          count: objectCategoryCount[`${category.dataValues.id}`]
            ? objectCategoryCount[`${category.dataValues.id}`].categoryCount
            : 0,
        };
      });

      res.status(201).json({ data: { categories: categoriesWithCounting } });
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

  public updateCategory: RequestHandler = async (req, res, next) => {
    try {
      const categoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: ICategories = await this.categoryService.updateCategory(categoryId, categoryData);
      res.json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory: RequestHandler = async (req, res, next) => {
    try {
      const categoryId = Number(req.params.id);
      const deleteCategoryData: ICategories = await this.categoryService.deleteCategory(categoryId);

      res.json({ data: deleteCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
