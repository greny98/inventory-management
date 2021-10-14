import { CreateStockOutDto } from '@/dtos/stockOut.dto';
import { IStockOut } from '@/interfaces/stockOut.interface';
import { CustomerModel } from '@/models/customers.model';
import { ProductModel } from '@/models/products.model';
import { ProductStockOutModel } from '@/models/productStockOut.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Sequelize from 'sequelize';

class StockOutService {
  public stockOut = DB.StockOut;

  public async createStockOut(stockOutData: CreateStockOutDto): Promise<IStockOut> {
    if (isEmpty(stockOutData)) {
      throw new HttpException(400, "You're not stockOutData");
    }
    return this.stockOut.create({ ...stockOutData });
  }

  public async getAllStockOut(page: number, queryToday?: boolean) {
    const limit = 10;
    const offset = page * limit;
    const whereDate = {};
    if (queryToday) {
      const TODAY_START = new Date().setHours(0, 0, 0, 0);
      const NOW = new Date();
      whereDate['createdAt'] = {
        [Sequelize.Op.gt]: TODAY_START,
        [Sequelize.Op.lt]: NOW,
      };
    }

    return this.stockOut.findAndCountAll({
      limit,
      offset,
      where: whereDate,
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
