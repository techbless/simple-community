import { Request, Response } from 'express';
import CommentService from '../services/comment';
import ArticleService from '../services/article';
import Article from '../models/article';

class CommentController {
  public getComments = async (req: Request, res: Response) => {
    const articleId: number = + req.params.articleId;

    const doestArticleExist = await ArticleService.getArticle(articleId) ? true : false;
    if(!doestArticleExist) {
      return res.sendStatus(404);
    }

    const comments = await CommentService.getComments(articleId);
    res.json(comments);
  }

  public createComment = async (req: Request, res: Response) => {
    const articleId: number = + req.params.articleId;
    const message: string = req.body.comment;
    const writterId: number = req.user!.userId;

    const comment = await CommentService.createComment(articleId, message, writterId);
    res.status(201).json(comment);
  }

  public deleteComment = async (req: Request, res: Response) => {
    const articleId: number = +req.params.articleId;
    const commentId: number = +req.params.commentId;
    const userId: number = req.user!.userId;

    const isOwner: boolean = await CommentService.checkOwner(userId, commentId);
    if(!isOwner) {
      return res.sendStatus(401);
    }

    const nDeletedRow = await CommentService.deleteComment(articleId, commentId);
    
    if(nDeletedRow >= 1) return res.sendStatus(202);
    else res.sendStatus(404)
  }
}

export default new CommentController();
