import { Sequelize, DataTypes, Model } from 'sequelize';
import { IProductStockOut } from '@interfaces/productStockOut.interface';

export class ProductStockOutModel extends Model<IProductStockOut> implements IProductStockOut {
  createdAt: Date;
  discount: number;
  id: number;
  productId: number;
  quantity: number;
  stockOutId: number;
}

export default function (sequelize: Sequelize): typeof ProductStockOutModel {
  ProductStockOutModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stockOutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      },
    },
    {
      tableName: 'product_stock_out',
      sequelize,
    },
  );

  return ProductStockOutModel;
}
