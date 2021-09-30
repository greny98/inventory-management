import bcrypt from 'bcrypt';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateCategoryDto } from '@/dtos/categories.dto';
import { ICategories } from '@/interfaces/categories.interface';

class CategoryService {
  public categories = DB.Categories;

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

    return this.categories.create({ ...categoryData });
  }
}

export default CategoryService;
