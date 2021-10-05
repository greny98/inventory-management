import { CreateStockInDto } from '@/dtos/stockIn.dto';
import { IStockIn } from '@/interfaces/stockIn.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ProductStockInModel } from '@models/productStockIn.model';

class StockInService {
  public stockIn = DB.StockIn;

  public async getAllStockIn(page: number) {
    const limit = 10;
    const offset = page * limit;
    return this.stockIn.findAll({ limit, offset, include: { model: ProductStockInModel } });
  }

  public async createStockIn(stockInData: CreateStockInDto): Promise<IStockIn> {
    // Check empty
    if (isEmpty(stockInData)) {
      throw new HttpException(400, "You're not stockInData");
    }
    // create new category
    return this.stockIn.create({ ...stockInData });
  }
}

export default StockInService;
