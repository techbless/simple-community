import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../component/Header';
import '../styles/NewPost.css';
import api, { getToken } from '../api';

async function uploadArticle(title: string, content: string) {
    await api.post(
        '/articles', {
            title: title,
            content: content,
        }, {
            headers: {
                Authorization: getToken()
            }
        }
    )
}

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <div>
            { isUploaded && <Redirect to='/' /> }
            
            <Header />
            <div className="editor">
                <h2>새로운 글</h2><br/>
                
                <input 
                    placeholder="글제목"
                    className="text-input title-input"
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                /><br/>

                <textarea 
                    placeholder="여기에 글을 작성하세요."
                    className="text-input"
                    name="content"
                    id="content"
                    cols={30}
                    rows={12}
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                /><br/>

                <Button className="add-btn" onClick={
                    async () => {
                        await uploadArticle(title, content);
                        setIsUploaded(true);
                    }
                }>추가</Button>
               
            </div>
        </div>
    );
}

export default NewPost;