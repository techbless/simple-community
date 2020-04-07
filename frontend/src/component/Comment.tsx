import React from 'react';
import "../styles/Comment.css";

function Comment(props: any) {
    return (
        <div className="comment">
            <p>{props.comment} - {props.writter}</p>
        </div>
    )
}

export default Comment;