import { CreateProductDto, UpdateProductDto } from '@/dtos/products.dto';
import { IProduct } from '@/interfaces/products.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Sequelize from 'sequelize';

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

  public async getAllProducts(page: number, categories?: number, name?: string): Promise<IProduct[]> {
    const limit = 10;
    const offset = page * limit;
    const where = {};
    if (categories) {
      where['categories'] = categories;
    }
    if (name) {
      where['name'] = {
        [Sequelize.Op.like]: `%${name}%`,
      };
    }
    return this.products.findAll({ limit, offset, where });
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
    const updateProduct: IProduct = await this.products.findByPk(productId);
    return updateProduct;
  }
}

export default ProductService;
