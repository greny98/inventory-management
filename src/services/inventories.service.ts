import { IInventory } from '@/interfaces/inventories.interface';
import { CategoryModel } from '@/models/categories.model';
import { ProductModel } from '@/models/products.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Sequelize from 'sequelize';

class InventoriesService {
  public inventories = DB.Inventories;

  public async getAllInventories(page: number, productName?: string, category?: number): Promise<IInventory[]> {
    const limit = 10;
    const offset = page * limit;
    const whereCategory = {};
    const whereProduct = {};
    if (category) {
      whereCategory['id'] = category;
    }
    if (productName) {
      whereProduct['name'] = {
        [Sequelize.Op.like]: `%${name}%`,
      };
    }
    return this.inventories.findAll({
      limit,
      offset,
      include: {
        model: ProductModel,
        as: 'Product',
        where: whereProduct,
        include: [
          {
            model: CategoryModel,
            as: 'category',
            where: whereCategory,
          },
        ],
      },
    });
  }
}

export default InventoriesService;
