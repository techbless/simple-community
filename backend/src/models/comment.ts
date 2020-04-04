import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import { dbType } from '.';

class Comment extends Model {
    public readonly commentId!: number;

    public comment!: string;

    public createdAt!: Date;

    public updatedAt!: Date;

    public writterId!: number;
}

Comment.init({
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING(700),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {
  Comment.belongsTo(db.User, { foreignKey: 'writterId', as: 'writter' });
  Comment.belongsTo(db.Article, { foreignKey: 'articleId'})
};

export default Comment;
