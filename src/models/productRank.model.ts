import { IProductRank } from '@/interfaces/productRank.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { ProductModel } from '@models/products.model';

export class ProductRankModel extends Model<IProductRank> implements IProductRank {
  id: number;
  productId: number;
  month: Date;
  year: Date;
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
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: ProductModel,
        },
      },
      month: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      year: {
        allowNull: false,
        type: DataTypes.DATE,
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

  return ProductRankModel;
}
