import { CreateStockInDto } from '@/dtos/stockIn.dto';
import { IStockIn } from '@/interfaces/stockIn.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DistributorModel } from '@/models/distributors.model';
import { ProductStockInModel } from '@/models/productStockIn.model';
import { ProductModel } from '@/models/products.model';
import Sequelize from 'sequelize';
import moment from 'moment';

class StockInService {
  public stockIn = DB.StockIn;

  public async getAllStockIn(page: number) {
    const limit = 10;
    const offset = page * limit;

    return this.stockIn.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: DistributorModel,
          as: 'distributor',
        },
        {
          model: ProductStockInModel,
          as: 'productStockIn',
          include: {
            model: ProductModel,
            as: 'product',
          } as any,
        },
      ],
    });
  }

  public async createStockIn(stockInData: CreateStockInDto): Promise<IStockIn> {
    // Check empty
    if (isEmpty(stockInData)) {
      throw new HttpException(400, "You're not stockInData");
    }
    // create new category
    return this.stockIn.create({ ...stockInData });
  }

  public async filterDate(fromDate: Date, toDate: Date, distributorId?: number) {
    const where = {
      createdAt: {
        [Sequelize.Op.between]: [fromDate, toDate],
      },
    };
    if (distributorId != null) {
      where['distributorId'] = distributorId;
    }

    return this.stockIn.findAll({
      where,
      include: [
        {
          model: DistributorModel,
          as: 'distributor',
        },
        {
          model: ProductStockInModel,
          as: 'productStockIn',
          include: {
            model: ProductModel,
            as: 'product',
          } as any,
        },
      ],
    });
  }

  public async calcCost(month: number, year: number) {
    const fromDate: Date = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const toDate: Date = moment(fromDate).endOf('month').toDate();
    const stockIn = await this.filterDate(fromDate, toDate);
    let cost = 0;
    (stockIn as any).forEach(s => {
      (s as any).dataValues.productStockIn.forEach(ps => {
        cost += ps.product.price * ps.quantity;
      });
    });
    return cost;
  }
}

export default StockInService;
