import { IStockIn } from '@/interfaces/stockIn.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DistributorModel } from '@models/distributors.model';

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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'stock_in',
      sequelize,
    },
  );
  StockInModel.belongsTo(DistributorModel, { foreignKey: 'distributorId', as: 'distributor' });
  return StockInModel;
}
