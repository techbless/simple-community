import Comment from '../models/comment';
import User from '../models/user';
import { join } from 'bluebird';


class CommentService {
    public getComments = async (articelId: number) => {
        const comments: Comment[] = await Comment.findAll({
            where: {
                articleId: articelId
            },
            include: [
                {
                    model: User,
                    as: 'writter',
                    attributes: ['username', 'email'],
                },
            ],
        });

        return comments;
    }

    public createComment = async (articleId: number, comment: string, writterId: number) : Promise<Comment> => {
        const newComment: Comment = await Comment.create({
            articleId: articleId,
            comment: comment,
            writterId: writterId
        });

        return newComment;
    }

    public deleteComment = async (articleId: number, commentId: number) : Promise<number> => {
        const nDeleteRow = await Comment.destroy({
            where: {
                articleId: articleId,
                commentId: commentId
            }
        });

        return nDeleteRow;
    }

    public checkOwner = async (usreId: number, commentId: number) : Promise<boolean> => {
        const comment = await Comment.findByPk(commentId);
        return comment?.writterId == usreId;
    }
    
}

export default new CommentService();