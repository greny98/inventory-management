import { IDistributor } from '@/interfaces/distributors.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class DistributorModel extends Model<IDistributor> implements IDistributor {
  id: number;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export default function (sequelize: Sequelize): typeof DistributorModel {
  DistributorModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'distributors',
      sequelize,
    },
  );

  return DistributorModel;
}
