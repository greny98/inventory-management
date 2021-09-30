import { Sequelize, DataTypes, Model } from 'sequelize';
import { ICustomer } from '@interfaces/customers.interface';

export class CustomerModel extends Model<ICustomer> implements ICustomer {
  address: string;
  id: number;
  name: string;
  phone: string;
}

export default function (sequelize: Sequelize): typeof CustomerModel {
  CustomerModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'customers',
      sequelize,
    },
  );

  return CustomerModel;
}
