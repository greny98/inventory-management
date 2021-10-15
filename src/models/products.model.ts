import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IProduct } from '@interfaces/products.interface';
import { CategoryModel } from '@models/categories.model';
import { InventoryModel } from './inventories.model';

export type OptionalProductAttributes = Optional<IProduct, 'image'>;

export class ProductModel extends Model<IProduct, OptionalProductAttributes> implements IProduct {
  categoryId: number;
  id: number;
  image?: string;
  name: string;
  price: number;
  purchasePrice: number;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
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
      purchasePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'products',
      sequelize,
    },
  );
  ProductModel.belongsTo(CategoryModel, { foreignKey: { name: 'categoryId' }, as: 'category' });
  // CategoryModel
  // ProductModel.hasOne(InventoryModel, { foreignKey: { name: 'product_id' }, as: 'inventory' });
  return ProductModel;
}
