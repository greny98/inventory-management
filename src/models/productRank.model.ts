import { IProductRank } from '@/interfaces/productRank.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { ProductModel } from '@models/products.model';

export class ProductRankModel extends Model<IProductRank> implements IProductRank {
  id: number;
  productId: number;
  month: number;
  year: number;
  quantity: number;
}

export default function (sequelize: Sequelize): typeof ProductRankModel {
  ProductRankModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      month: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'product_rank',
      sequelize,
    },
  );

  ProductRankModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

  return ProductRankModel;
}
