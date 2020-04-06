import React, { useState, useEffect } from 'react';
import api, {getToken} from '../api';
import Header from '../component/Header';
import ArticleCard from '../component/ArticleCard';

import '../styles/Home.css';

interface IArticle {
    articleId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    author: {
        username: string;
        email: string;
    }
}

function Home() {

    const [articles, setArticles] = useState<IArticle[] | null>([]);

    useEffect(() => {
        console.log('useEffect() entry point');
        (async () => {
            const token = getToken();

            console.log(token);
            const result = await api.get('/articles/', {
                headers: {
                    Authorization: token
                }
            });

            const articles = result.data;
            setArticles(articles);
        })();
    }, []);

    return (
        <div>

            <Header />
            {
                articles?.map((article: IArticle) => {
                    return (
                        <a className="article-link" href={"/article/" + article.articleId}>
                            <ArticleCard key={article.articleId} title={article.title} author={article.author.username} createdAt={article.createdAt} />
                        </a>
                    )
                })
            }

        </div>
    );
}

export default Home;