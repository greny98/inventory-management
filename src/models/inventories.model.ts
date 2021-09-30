import { IInventory } from '@/interfaces/inventories.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class InventoryModel extends Model<IInventory> implements IInventory {
  id: number;
  productId: number;
  quantity: number;
  lastUpdatedAt: Date;
}

export default function (sequelize: Sequelize): typeof InventoryModel {
  InventoryModel.init(
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
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      lastUpdatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'inventories',
      sequelize,
    },
  );

  return InventoryModel;
}
