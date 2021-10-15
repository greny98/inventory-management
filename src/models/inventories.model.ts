import { IInventory } from '@/interfaces/inventories.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { ProductModel } from './products.model';

export class InventoryModel extends Model<IInventory> implements IInventory {
  id: number;
  productId: number;
  quantity: number;
}

export default function (sequelize: Sequelize): typeof InventoryModel {
  InventoryModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      // lastUpdatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      //   defaultValue: new Date(),
      // },
    },
    {
      tableName: 'inventories',
      sequelize,
    },
  );
  InventoryModel.belongsTo(ProductModel, { foreignKey: { name: 'product_id' }, as: 'product' });
  return InventoryModel;
}
