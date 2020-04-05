import React from 'react';
import Header from '../component/Header';
import '../styles/NewPost.css';

function uploadArticle() {

}

function NewPost() {
    return (
        <div>
            <Header />
            <div className="editor">
                <h2>새로운 글</h2><br/>
                <form method="post" onSubmit={uploadArticle}>
                    <input 
                        placeholder="글제목"
                        className="text-input title-input"
                        type="text"
                        name="title"
                        id="title"
                    /><br/>

                    <textarea 
                        placeholder="여기에 글을 작성하세요."
                        className="text-input"
                        name="content"
                        id="content"
                        cols={30}
                        rows={12}>
                    </textarea><br/>

                    <input type="submit" className="btn btn-primary add-btn" value="추가" />
                </form>
            </div>
        </div>
    );
}

export default NewPost;