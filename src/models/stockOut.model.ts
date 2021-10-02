import { Sequelize, DataTypes, Model } from 'sequelize';
import { IStockOut } from '@interfaces/stockOut.interface';
import { CustomerModel } from '@models/customers.model';

export class StockOutModel extends Model<IStockOut> implements IStockOut {
  createdAt: Date;
  customerId: number;
  id: number;
}

export default function (sequelize: Sequelize): typeof StockOutModel {
  StockOutModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: CustomerModel,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'stock_out',
      sequelize,
    },
  );

  return StockOutModel;
}
