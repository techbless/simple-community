import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { getToken } from '../api';
import Header from '../component/Header';
import '../styles/Article.css';
import moment from 'moment';
import Comment from '../component/Comment';

interface IComment {
    commentId?: number;
    comment?: string;
    createdAt?: Date;
    updateAt?: Date;
    writter?: {
        username: string;
        email: string;
    }
}

function convertDateTime(createdAt: string) {
    const result = moment(createdAt);
    return result.format('YY/MM/DD hh:mm');
}

function Article() {
    const { articleId } = useParams();

    const [article, setArticle] = useState({
        title: '해당 게시글이 존재하지 않습니다.',
        content: '해당 게시글이 존재하지 않습니다.',
        author: '',
        createdAt: ''
    }); 

    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        console.log(articleId);
        async function getArticleAndComment() {
            try {
                const articleResult = await api.get(`/articles/${articleId}`, {
                    headers: {
                        Authorization: getToken()
                    }
                });
                const article = articleResult.data;

                setArticle({
                    title: article.title,
                    content: article.content,
                    author: article.author.username,
                    createdAt: convertDateTime(article.author.createdAt)
                });

                const commentsResult = await api.get<IComment[]>(`/articles/${articleId}/comments`, {
                    headers: {
                        Authorization: getToken()
                    }
                })

                setComments(commentsResult.data);
            } catch(error) {
                alert("게시글이 존재하지 않습니다.");
            }
        }

        getArticleAndComment();
    }, []);

    async function addNewComment() {
        try {
            const result = await api.post<IComment>(`/articles/${articleId}/comments`, {
                comment: newComment
            }, {
                headers: {
                    Authorization: getToken()
                }
            })

            const addedComment = result.data;
            if(!addedComment.commentId) {
                throw Error("Not Proper Responsoe.");
            }

            setComments(comments.concat(addedComment));
            setNewComment('');
        } catch(error) {
            alert("댓글 작성중 오류가 발생했습니다.");
        }
    }

    return (
        <div>
            <Header />
            <div className="reader">
                <h2>{article.title}</h2>
                <h6 className="author-date">{article.author}, {article.createdAt}</h6>
                <hr/>
                <pre className="content-section">
                    {article.content}
                </pre>
                <h5>Comments</h5>
                <hr/>
                <div className="comment-box">
                    <input
                        type="text" 
                        placeholder="댓글을 입력해주세요."
                        className="comment-input"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />

                    <input
                        className="btn btn-primary comment-btn"
                        type="submit"
                        value="댓글추가"
                        onClick={addNewComment}
                    />

                </div>

                {
                    comments.map((comment) => {
                        return (
                            <Comment 
                                key={comment.commentId} 
                                comment={comment.comment} 
                                writter={comment.writter?.username}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Article;