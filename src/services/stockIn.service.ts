import { CreateStockInDto } from '@/dtos/stockIn.dto';
import { IStockIn } from '@/interfaces/stockIn.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class StockInService {
  public stockIn = DB.StockIn;

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
