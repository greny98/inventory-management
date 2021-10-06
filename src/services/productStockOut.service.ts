import { CreateProductStockOutDto } from '@/dtos/productStockOut.dto';
import { IProductStockOut } from '@/interfaces/productStockOut.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ProductStockOutService {
  public prodStockOut = DB.ProductStockOut;

  public async createProductStockOut(stockOutData: CreateProductStockOutDto): Promise<IProductStockOut> {
    // Check empty
    if (isEmpty(stockOutData)) {
      throw new HttpException(400, "You're not stockOutData");
    }
    // create new category
    return this.prodStockOut.create({ ...stockOutData });
  }
}

export default ProductStockOutService;
