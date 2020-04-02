import { Request, Response } from 'express';

import User from '../models/user';
import Article from '../models/article';
import Comment from '../models/comment';

class ArticleController {
    public getArticle = async (req: Request, res: Response) => {
      const { articleId } = req.params;
      const article: Article | null = await Article.findOne({
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'email'],
          },
        ],
        where: {
          articleId,
        },
      });

      if (!article) {
        res.status(404).json({
          errorMessage: 'This is no such article.',
        });
      } else {
        res.json(article);
      }
    }

    public createArticle = async (req: Request, res: Response) => {
      const article: Article = await Article.create({
        title: req.body.title,
        content: req.body.content,
        authorId: req.user?.userId,
      });
      res.json(article);
    }

    public modifyArticle = (req: Request, res: Response) => {
      res.json();
    }

    public deleteArticle = (req: Request, res: Response) => {
      res.json();
    }
}

export default new ArticleController();
