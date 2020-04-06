import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { login } from '../api';
import { Redirect } from 'react-router-dom';
import Header from '../component/Header';

import '../styles/Account.css';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginApi(username: string, password: string) {
        if(await login(username, password)) setIsLoggedIn(true);
        else alert('Username 혹은 Password를 확인해주세요.');
    }

    return (
        <div>
            { isLoggedIn ? <Redirect to='/' /> : '' }

            <Header />
            <div className="login-box">
                <h2>로그인</h2>
                <input 
                    className="idpw-input"
                    placeholder="UserName"
                    type="text" 
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input 
                    className="idpw-input"
                    placeholder="Password"
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={async () => await loginApi(username, password)}>
                    로그인
                </Button>
            </div>
        </div>
    )
}

export default Login;