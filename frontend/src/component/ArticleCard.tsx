import React from 'react';
import moment from 'moment';

import '../styles/ArticleCard.css';

function convertDateTime(createdAt: string) {
    const result = moment(createdAt);
    return result.format('YY/MM/DD hh:mm');
}

function ArticleCard(props: any) {
    
    return (
        <div className="card">
            <p className="title">{props.title}</p>
            <p className="author-date">
                <span className="author">{props.author}</span>{convertDateTime(props.createdAt)}
            </p>
        </div>
    )
}

export default ArticleCard;