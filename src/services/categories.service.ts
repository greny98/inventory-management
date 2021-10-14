import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateCategoryDto } from '@/dtos/categories.dto';
import { ICategories } from '@/interfaces/categories.interface';
import sequelize from 'sequelize';

class CategoryService {
  public categories = DB.Categories;
  public products = DB.Products;

  public async createCategory(categoryData: CreateCategoryDto): Promise<ICategories> {
    // Check empty
    if (isEmpty(categoryData)) {
      throw new HttpException(400, "You're not categoryData");
    }
    // Check category exist
    const findCategory: ICategories = await this.categories.findOne({ where: { name: categoryData.name } });
    if (findCategory) {
      throw new HttpException(409, `Your category ${categoryData.name} already exists`);
    }
    // create new category
    return this.categories.create({ ...categoryData });
  }

  public async getAllCategories(page: number): Promise<ICategories[]> {
    const limit = 10;
    const offset = page * limit;
    return this.categories.findAll({ limit, offset });
  }

  public async getCountAllCategories(): Promise<any> {
    return this.products.findAll({
      group: ['categoryId'],
      attributes: ['categoryId', [sequelize.fn('COUNT', 'categoryId'), 'categoryCount']],
    });
  }

  public searchCategory(name: string): Promise<ICategories> {
    return this.categories.findOne({ where: { name } });
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoryDto): Promise<ICategories> {
    if (isEmpty(categoryData)) {
      throw new HttpException(400, "You're not categoryData");
    }
    const findCategory: ICategories = await this.categories.findByPk(categoryId);
    if (!findCategory) {
      throw new HttpException(400, "You're not category");
    }
    await this.categories.update({ ...categoryData }, { where: { id: categoryId } });

    const updateCategory: ICategories = await this.categories.findByPk(categoryId);
    return updateCategory;
  }

  public async deleteCategory(categoryId: number): Promise<ICategories> {
    if (isEmpty(categoryId)) {
      throw new HttpException(400, "You're not categoryId");
    }
    const findCategory: ICategories = await this.categories.findByPk(categoryId);
    if (!findCategory) {
      throw new HttpException(400, "You're not category");
    }
    await this.categories.destroy({ where: { id: categoryId } });

    return findCategory;
  }
}

export default CategoryService;
