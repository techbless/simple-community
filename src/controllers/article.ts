import { Request, Response } from 'express';

import User from '../models/user';
import Article from '../models/article';

class ArticleController {
  public getArticles = async (req: Request, res: Response) => {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'email'],
        },
      ],
    });

    res.json(articles);
  }

  public getArticle = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    const article = await Article.findOne({
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
      res.status(404)
        .json({
          errorMessage: 'There is no such article.',
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

  public deleteArticle = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({
        errorMessage: 'There is no such article.',
      });
    }

    if (article.authorId !== req.user?.userId) {
      return res.status(401).json({
        errorMessage: 'You are not authorized.',
      });
    }

    await article.destroy();

    res.sendStatus(202);
  }
}

export default new ArticleController();
