import React from 'react';

import '../styles/ArticleCard.css';


function ArticleCard(props: any) {
    return (
        <div className="card">
            <p className="title">{props.title}</p>
            <p className="date">{props.createdAt}</p>
        </div>
    )
}

export default ArticleCard;