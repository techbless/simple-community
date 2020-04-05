import { Request, Response } from 'express';
import ArticleService from '../services/article';

class ArticleController {
  public getArticles = async (req: Request, res: Response) => {
    const articles = await ArticleService.getArticles()
    res.json(articles);
  }

  public getArticle = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    const article = await ArticleService.getArticle(+articleId);

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
    const title = req.body.title;
    const content = req.body.title;
    const authorId = req.user!.userId;

    const article = await ArticleService.createArticle(title, content, authorId);
    res.status(201).json(article);
  }

  public modifyArticle = (req: Request, res: Response) => {
    res.json();
  }

  public deleteArticle = async (req: Request, res: Response) => {
    const articleId: number = +req.params.articleId;
    const userId: number = req.user!.userId;

    const isOwner: boolean = await ArticleService.checkOwner(userId, articleId);

    if(!isOwner) {
      return res.sendStatus(401);
    }

    const nDeletedRow = await ArticleService.deleteArticle(articleId);
    if(nDeletedRow >= 1) return res.sendStatus(202);
    else res.sendStatus(404);
  }
}

export default new ArticleController();
