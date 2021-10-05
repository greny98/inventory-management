import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProductStockInDto } from '@dtos/productStockIn.dto';
import { IProductStockIn } from '@interfaces/productStockIn.interfaces';
import { ProductStockInModel } from '@models/productStockIn.model';
import { ProductModel } from '@models/products.model';
import { StockInModel } from '@models/stockIn.model';

class ProductStockInService {
  public prodStockIn = DB.ProductStockIn;

  public async createProductStockIn(stockInData: CreateProductStockInDto): Promise<IProductStockIn> {
    // Check empty
    if (isEmpty(stockInData)) {
      throw new HttpException(400, "You're not stockInData");
    }
    // create new category
    return this.prodStockIn.create({ ...stockInData });
  }

  public async getAllProductStockIn(page: number) {
    const limit = 10;
    const offset = page * limit;
    return this.prodStockIn.findAll({
      limit,
      offset,
      include: [
        { model: ProductModel, as: 'product' },
        { model: StockInModel, as: 'stockIn' },
      ],
    });
  }
}

export default ProductStockInService;
