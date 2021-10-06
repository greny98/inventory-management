import { CreateStockOutDto } from '@/dtos/stockOut.dto';
import { IStockOut } from '@/interfaces/stockOut.interface';
import { CustomerModel } from '@/models/customers.model';
import { ProductModel } from '@/models/products.model';
import { ProductStockOutModel } from '@/models/productStockOut.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class StockOutService {
  public stockOut = DB.StockOut;

  public async createStockOut(stockOutData: CreateStockOutDto): Promise<IStockOut> {
    if (isEmpty(stockOutData)) {
      throw new HttpException(400, "You're not stockOutData");
    }
    return this.stockOut.create({ ...stockOutData });
  }

  public async getAllStockOut(page: number): Promise<IStockOut[]> {
    const limit = 10;
    const offset = page * limit;
    return this.stockOut.findAll({
      limit,
      offset,
      include: [
        {
          model: CustomerModel,
          as: 'customer',
        },
        {
          model: ProductStockOutModel,
          as: 'productStockOut',
          include: {
            model: ProductModel,
            as: 'product',
          } as any,
        },
      ],
    });
  }
}

export default StockOutService;
