import User, { associate as associateUser } from './user';
import Article, { associate as associateArticle } from './article';
import Comment, { associate as associateComment } from './comment';


export * from './sequelize';

const db = {
  User,
  Article,
  Comment,
};

export type dbType = typeof db;

associateUser(db);
associateArticle(db);
associateComment(db);
