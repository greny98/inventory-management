import { Sequelize, DataTypes, Model } from 'sequelize';
import { IProductStockOut } from '@interfaces/productStockOut.interface';
import { ProductModel } from './products.model';
import { StockOutModel } from './stockOut.model';

export class ProductStockOutModel extends Model<IProductStockOut> implements IProductStockOut {
  id: number;
  quantity: number;
  productId: number;
  stockOutId: number;
  discount: number;
  createdAt: Date;
}

export default function (sequelize: Sequelize): typeof ProductStockOutModel {
  ProductStockOutModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'product_stock_out',
      sequelize,
    },
  );

  ProductStockOutModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });
  ProductStockOutModel.belongsTo(StockOutModel, { foreignKey: 'stockOutId', as: 'stockOut' });
  StockOutModel.hasMany(ProductStockOutModel, { foreignKey: 'stockOutId', as: 'productStockOut' });

  return ProductStockOutModel;
}
