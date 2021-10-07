import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProductRankDto } from '@/dtos/productRank.dto';
import { IProductRank } from '@/interfaces/productRank.interface';
import { ProductModel } from '@/models/products.model';

class ProductRankService {
  public productRank = DB.ProductRank;

  public async createOrUpdateProductRank(productRankData: CreateProductRankDto): Promise<IProductRank> {
    // check empty
    if (isEmpty(productRankData)) {
      throw new HttpException(400, "You're not ProductRankData");
    }
    // check ProductRank exist
    const productExisted = await this.productRank.findOne({
      where: {
        productId: productRankData.productId,
        month: productRankData.month,
        year: productRankData.year,
      },
    });
    if (productExisted) {
      const newQuantity = productExisted.quantity + productRankData.quantity;
      await this.productRank.update(
        { ...productExisted, quantity: newQuantity },
        { where: { productId: productRankData.productId, month: productRankData.month, year: productRankData.year } },
      );
      const updateProductRank: IProductRank = await this.productRank.findOne({
        where: { productId: productRankData.productId, month: productRankData.month, year: productRankData.year },
      });
      return updateProductRank;
    }
    return this.productRank.create({ ...productRankData });
  }

  public async getAllProductRank(page: number, month?: number, year?: number): Promise<IProductRank[]> {
    const limit = 10;
    const offset = page * limit;
    const where = {};
    if (year) {
      where['year'] = year;
    }
    if (month) {
      where['month'] = month;
    }

    return this.productRank.findAll({
      limit,
      offset,
      order: [
        ['quantity', 'DESC'],
        ['year', 'DESC'],
        ['month', 'DESC'],
      ],
      where,
      include: {
        model: ProductModel,
        as: 'product',
      },
    });
  }
}

export default ProductRankService;
