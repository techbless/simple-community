import { Request, Response } from 'express';

import Comment from '../models/comment';
import User from '../models/user';

class CommentController {
  public getComments = async (req: Request, res: Response) => {
    const comments = await Comment.findAll({
      where: {
        articleId: req.params.articleId,
      },
      include: [
        {
          model: User,
          as: 'writter',
          attributes: ['username', 'email'],
        },
      ],
    });
    if (!comments) {
      res.send({});
    } else {
      res.send(comments);
    }
  }

  public createComment = async (req: Request, res: Response) => {
    const comment = await Comment.create({
      articleId: req.params.articleId,
      comment: req.body.comment,
      writterId: req.user?.userId,
    });

    res.json(comment);
  }

  public deleteComment = async (req: Request, res: Response) => {
    const { commentId, articleId } = req.params;

    const comment = await Comment.findOne({
      where: {
        articleId,
        commentId,
      },
    });

    if (!comment) {
      return res.status(404).json({
        errorMessage: 'There is no such comment.',
      });
    }

    console.log(comment.writterId);
    if (comment.writterId !== req.user?.userId) {
      return res.status(401).json({
        errorMessage: 'You are not authorized.',
      });
    }

    await comment.destroy();
    res.sendStatus(202);
  }
}

export default new CommentController();
