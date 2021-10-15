import { CreateStockOutDto } from '@/dtos/stockOut.dto';
import { IStockOut } from '@/interfaces/stockOut.interface';
import { CustomerModel } from '@/models/customers.model';
import { ProductModel } from '@/models/products.model';
import { ProductStockOutModel } from '@/models/productStockOut.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Sequelize from 'sequelize';
import moment from 'moment';

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
  public async filterDate(fromDate: Date, toDate: Date, customerId?: number) {
    const where = {
      createdAt: {
        [Sequelize.Op.between]: [fromDate, toDate],
      },
    };
    if (customerId != null) {
      where['customerId'] = customerId;
    }

    return this.stockOut.findAll({
      where,
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

  public async calcRevenue(month: number, year: number) {
    const fromDate: Date = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const toDate: Date = moment(fromDate).endOf('month').toDate();
    const stockOut = await this.filterDate(fromDate, toDate);
    let revenue = 0;
    (stockOut as any).forEach(s => {
      (s as any).dataValues.productStockOut.forEach(ps => {
        revenue += ps.product.price * ps.quantity;
      });
    });
    return revenue;
  }
}

export default StockOutService;
