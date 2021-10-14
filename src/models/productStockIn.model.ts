import { Sequelize, DataTypes, Model } from 'sequelize';
import { IProductStockIn } from '@/interfaces/productStockIn.interfaces';
import { ProductModel } from '@models/products.model';
import { StockInModel } from '@models/stockIn.model';

export class ProductStockInModel extends Model<IProductStockIn> implements IProductStockIn {
  id: number;
  quantity: number;
  productId: number;
  stockInId: number;
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
      discount: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
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

  ProductStockInModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });
  ProductStockInModel.belongsTo(StockInModel, { foreignKey: 'stockInId', as: 'stockIn' });
  StockInModel.hasMany(ProductStockInModel, { foreignKey: 'stockInId', as: 'productStockIn' });

  return ProductStockInModel;
}
