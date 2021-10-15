import { CreateInventoryDto, updateInventoryDto } from '@/dtos/inventories.dto';
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
        as: 'product',
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
  public async searchInventory(searchField?: string): Promise<any> {
    const whereSearch = {};
    if (searchField) {
      whereSearch['name'] = {
        [Sequelize.Op.like]: `%${searchField}%`,
      };
    }

    return this.inventories.findAll({
      include: {
        model: ProductModel,
        as: 'product',
        where: whereSearch,
        include: [
          {
            model: CategoryModel,
            as: 'category',
          },
        ],
      },
    });
  }

  public async createInventory(inventoryData: CreateInventoryDto): Promise<IInventory> {
    // check empty
    if (isEmpty(inventoryData)) {
      throw new HttpException(400, "Inventory's Data is empty");
    }
    // check product exist
    const productExisted = await this.inventories.findOne({ where: { productId: inventoryData.productId } });
    if (productExisted) {
      throw new HttpException(409, `This Product Id ${inventoryData.productId} already exists`);
    }
    return this.inventories.create({ ...inventoryData });
  }

  public async updateInventory(inventoryData: updateInventoryDto): Promise<IInventory> {
    // check empty
    if (isEmpty(inventoryData)) {
      throw new HttpException(400, "You're not inventoryData");
    }
    // check exist product in inventory
    const findProductInInventory: IInventory = await this.inventories.findOne({
      where: { productId: inventoryData.productId },
    });
    if (!findProductInInventory) {
      throw new HttpException(400, "You're not Product");
    }
    // Update quantity of existed product
    const quantity = findProductInInventory.quantity + inventoryData.quantity;
    if (quantity < 0) {
      throw new HttpException(400, 'Not enough Product Quantity');
    }
    await this.inventories.update(
      { ...findProductInInventory, quantity },
      { where: { productId: inventoryData.productId } },
    );
    const updateProductInventory: IInventory = await this.inventories.findOne({
      where: { productId: inventoryData.productId },
    });
    return updateProductInventory;
  }

  public async searchProductInInventory(productId: number): Promise<IInventory> {
    return this.inventories.findOne({ where: { productId } });
  }
}

export default InventoriesService;
