import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProductStockInDto } from '@dtos/productStockIn.dto';
import { IProductStockIn } from '@interfaces/productStockIn.interfaces';

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
}

export default ProductStockInService;
