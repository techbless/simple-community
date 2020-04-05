import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import { dbType } from '.';

class Article extends Model {
    public readonly articleId!: number;

    public title!: string;

    public content!: string;

    public createdAt!: Date;

    public updatedAt!: Date;

    public authorId!: number;
}

Article.init({
  articleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(5000),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'articles',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {
  //Article.belongsTo(db.User, { as: 'author' , foreignKey: 'authorId' });
  Article.belongsTo(db.User, { foreignKey: 'authorId', as: 'author', });
  Article.hasMany(db.Comment, { foreignKey: 'articleId', });
};

export default Article;
