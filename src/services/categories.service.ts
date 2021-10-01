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
    // create new category
    return this.categories.create({ ...categoryData });
  }

  public async getAllCategories(page: number): Promise<ICategories[]> {
    const limit = 10;
    const offset = page * limit;
    return this.categories.findAll({ limit: offset });
  }

  public searchCategory(name: string): Promise<ICategories> {
    return this.categories.findOne({ where: { name } });
  }
}

export default CategoryService;
