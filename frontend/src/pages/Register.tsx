import React, { useState, FormEvent } from 'react';
import Header from '../component/Header';
import '../styles/Account.css';
import api from '../api';
import { Redirect } from 'react-router-dom';

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [isDone, setIsDone] = useState(false);

    async function registerApi(e: FormEvent) {
        e.preventDefault();
        const result = await api.post('/register', {
            username: userName,
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName
        })

        if(result.data.userId) {
            setIsDone(true);
        }
    }

    return (
        <div>
            { isDone ? <Redirect to='/' /> : '' }

            <Header />

            <div className="login-box">
                <h2>회원가입</h2>

                <form onSubmit={registerApi}>
                    <input 
                        className="idpw-input"
                        placeholder="UserName"
                        type="text" 
                        name="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />

                    <input 
                        className="idpw-input"
                        placeholder="Email"
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input 
                        className="firstname name-input idpw-input"
                        placeholder="FirstName"
                        type="text" 
                        name="firstName" 
                        value={firstName ? firstName : ''}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input 
                        className="idpw-input name-input"
                        placeholder="LastName"
                        type="text" 
                        name="lastName" 
                        value={lastName ? lastName : ''}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input 
                        className="idpw-input"
                        placeholder="Password"
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />


                    <input type="submit" className="btn btn-primary" value="회원가입"/>
                </form>


            </div>
        </div>
    )
}

export default Register;