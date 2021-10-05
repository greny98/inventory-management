import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import UserModelSeq from '@models/users.model';
import ProductModelSeq, { ProductModel } from '@models/products.model';
import { logger } from '@utils/logger';
import StockOutModelSeq from '@models/stockOut.model';
import ProductStockOutModelSeq from '@models/productStockOut.model';
import StockInModelSeq from '@models/stockIn.model';
import ProductStockInModelSeq from '@models/productStockIn.model';
import CategoryModelSeq, { CategoryModel } from '@/models/categories.model';
import CustomerModelSeq from '@/models/customers.model';
import DistributorModelSeq from '@/models/distributors.model';
import InventoryModelSeq from '@/models/inventories.model';
import ProductRankModelSeq from '@/models/productRank.model';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  // timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModelSeq(sequelize),
  Categories: CategoryModelSeq(sequelize),
  Customers: CustomerModelSeq(sequelize),
  Distributors: DistributorModelSeq(sequelize),
  Products: ProductModelSeq(sequelize),
  StockOut: StockOutModelSeq(sequelize),
  ProductStockOut: ProductStockOutModelSeq(sequelize),
  StockIn: StockInModelSeq(sequelize),
  ProductStockIn: ProductStockInModelSeq(sequelize),
  Inventories: InventoryModelSeq(sequelize),
  ProductRank: ProductRankModelSeq(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
