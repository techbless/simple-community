import axios from 'axios';

const api = axios.create({
    baseURL: 'http://yunbin.kr:5000',
})

export function getToken() {
    return localStorage.getItem('jwt-token');
}

function setToken(token: string) {
    localStorage.setItem('jwt-token', renderTokenString(token));
}

function renderTokenString(token: string) {
    return `Bearer ${token}`;
}

export async function login(username: string, password: string) {
    try {
        const result = await api.post('/login', {
            username: username, 
            password: password
        });
        
        if(!result.data.token) {
            return false;
        }
    
        setToken(result.data.token);
        return getToken() ? true: false;

    } catch(error) {
        return false;
    }
}

export default api;
