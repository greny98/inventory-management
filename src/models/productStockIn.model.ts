import { IProductStockIn } from '@/interfaces/productStockIn.interfaces';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class ProductStockInModel extends Model<IProductStockIn> implements IProductStockIn {
  id: number;
  productId: number;
  stockInId: number;
  quantity: number;
  discount: number;
  createdAt: Date;
}

export default function (sequelize: Sequelize): typeof ProductStockInModel {
  ProductStockInModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stockInId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      discount: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'product_stock_in',
      sequelize,
    },
  );

  return ProductStockInModel;
}
