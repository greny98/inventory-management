import { CreateProductDto, UpdateProductDto } from '@/dtos/products.dto';
import { IProduct } from '@/interfaces/products.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Sequelize from 'sequelize';
import { CategoryModel } from '@models/categories.model';
import { InventoryModel } from '@models/inventories.model';

class ProductService {
  public products = DB.Products;

  public async createProduct(productData: CreateProductDto): Promise<IProduct> {
    // Check empty
    if (isEmpty(productData)) {
      throw new HttpException(400, "You're not productData");
    }
    // Check Product exist
    const findProduct: IProduct = await this.products.findOne({ where: { name: productData.name } });
    if (findProduct) {
      throw new HttpException(409, `Your product ${productData.name} already exists`);
    }
    // create new Product
    return this.products.create({ ...productData });
  }

  public async getAllProducts(
    page: number,
    category?: number,
    name?: string,
  ): Promise<{ rows: IProduct[]; count: number }> {
    const limit = 10;
    const offset = page * limit;
    const whereProduct = {};
    const whereCategory = {};
    if (category) {
      whereCategory['id'] = category;
    }
    if (name) {
      whereProduct['name'] = {
        [Sequelize.Op.like]: `%${name}%`,
      };
    }
    return this.products.findAndCountAll({
      limit,
      offset,
      where: whereProduct,
      include: [
        {
          model: CategoryModel,
          as: 'category',
          where: whereCategory,
        },
        // {
        //   model: InventoryModel,
        //   as: 'inventory',
        // },
      ],
    });
  }

  public async updateProduct(productId: string, productData: UpdateProductDto): Promise<IProduct> {
    if (isEmpty(productData)) {
      throw new HttpException(400, "You're not Product");
    }
    const findProduct: IProduct = await this.products.findByPk(productId);
    if (!findProduct) {
      throw new HttpException(400, "You're not Product");
    }
    await this.products.update({ ...productData }, { where: { id: productId } });
    const updateProduct: IProduct = await this.products.findOne({
      where: {
        id: productId,
      },
      include: {
        model: DB.Categories,
        as: 'category',
      },
    });
    return updateProduct;
  }

  public async getOneProduct(productId?: string): Promise<IProduct> {
    if (isEmpty(productId)) {
      throw new HttpException(400, "You're not Product");
    }
    const findProduct: IProduct = await this.products.findOne({
      where: {
        id: productId,
      },
      include: {
        model: DB.Categories,
        as: 'category',
      },
    });
    if (!findProduct) {
      throw new HttpException(400, "You're not Product");
    }
    return findProduct;
  }
}

export default ProductService;
