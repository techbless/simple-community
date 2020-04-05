import Article from "../models/article";
import User from "../models/user";


class ArticleService {
    public getArticles = async () : Promise<Article[]> => {
        const articles: Article[] = await Article.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'email'],
                }
            ]
        });

        return articles;
    }

    public getArticle = async (articleId: number) : Promise<Article | null> => {
        const article: Article | null = await Article.findOne({
            where: {
                articleId: articleId,
            },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'email'],
                }
            ]
        });

        return article;
    }

    public createArticle = async (title: string, content: string, authorId: number) : Promise<Article> => {
        const article: Article = await Article.create({
            title: title,
            content: content,
            authorId: authorId,
        });
        
        return article;
    }

    public deleteArticle = async(articleId: number) : Promise<number> => {
        return await Article.destroy({
            where: {
                articleId: articleId,
            },
        })
    }

    public checkOwner = async (userId: number, articleId: number) : Promise<boolean> => {
        const article = await Article.findByPk(articleId);
        return article?.authorId == userId;
    }

}

export default new ArticleService();