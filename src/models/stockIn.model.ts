import { IStockIn } from '@/interfaces/stockIn.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class StockInModel extends Model<IStockIn> implements IStockIn {
  id: number;
  distributorId: number;
  createdAt: Date;
}

export default function (sequelize: Sequelize): typeof StockInModel {
  StockInModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      distributorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'stock_in',
      sequelize,
    },
  );

  return StockInModel;
}
