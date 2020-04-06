import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { getToken } from '../api';
import Header from '../component/Header';

function Article() {
    const [article, setArticle] = useState({
        title: '',
        content: '',
        author: '',
    }); 

    const { articleId } = useParams();

    useEffect(() => {
        console.log(articleId);
        async function getArticle() {
            const result = await api.get(`/articles/${articleId}`, {
                headers: {
                    Authorization: getToken()
                }
            });
            const article = result.data;
            setArticle({
                title: article.title,
                content: article.content,
                author: article.author.username
            })
        }

        getArticle();
    }, []);

    return (
        <div>
            <Header />
            <h1>{article.title}</h1>
            <h5>{article.author}</h5>
            <hr/>
            <pre>
                {article.content}
            </pre>
        </div>
    )
}

export default Article;