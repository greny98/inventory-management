import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import UserModel from '@models/users.model';
import ProductModel from '@models/products.model';
import { logger } from '@utils/logger';
import StockOutModel from '@models/stockOut.model';
import ProductStockOutModel from '@models/productStockOut.model';
import StockInModel from '@models/stockIn.model';
import ProductStockInModel from '@models/productStockIn.model';
import CategoryModel from '@/models/categories.model';
import CustomerModel from '@/models/customers.model';
import DistributorModel from '@/models/distributors.model';
import InventoryModel from '@/models/inventories.model';
import ProductRankModel from '@/models/productRank.model';

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
  Users: UserModel(sequelize),
  Categories: CategoryModel(sequelize),
  Customers: CustomerModel(sequelize),
  Distributors: DistributorModel(sequelize),
  Products: ProductModel(sequelize),
  StockOut: StockOutModel(sequelize),
  ProductStockOut: ProductStockOutModel(sequelize),
  StockIn: StockInModel(sequelize),
  ProductStockIn: ProductStockInModel(sequelize),
  Inventories: InventoryModel(sequelize),
  ProductRank: ProductRankModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
