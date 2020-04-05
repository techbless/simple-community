import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../component/Header';
import ArticleCard from '../component/ArticleCard';

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
            const result = await api.get('/articles/');
            const articles = result.data;
            setArticles(articles);
        })();
    }, []);

    return (
        <div>
            <Header />
            {
                articles?.map((article: IArticle) => {
                    return <ArticleCard key={article.articleId} title={article.title} createdAt={article.createdAt} />
                })
            }

        </div>
    );
}

export default Home;