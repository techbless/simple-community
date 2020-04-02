import React, {useState} from 'react';

import '../styles/ArticleCard.css';


function ArticleCard(props: any) {
    return (
        <div className="card">
            <p className="title">{props.title}</p>
            <p>{props.createdAt}</p>
        </div>
    )
}

export default ArticleCard;