import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2MTAzNTYxLCJleHAiOjE1ODYxMDcxNjF9.F9RZGoZV5jiER8lkN_uWnHja-B7uAQTOZEH-lhbQB-U'
    }
})