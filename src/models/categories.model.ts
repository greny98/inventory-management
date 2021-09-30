import { ICategories } from '@/interfaces/categories.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class CategoryModel extends Model<ICategories> implements ICategories {
  id: number;
  name: string;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
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
    },
    {
      tableName: 'categories',
      sequelize,
    },
  );

  return CategoryModel;
}
