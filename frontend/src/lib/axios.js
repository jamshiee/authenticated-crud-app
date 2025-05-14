import axios from 'axios';


const api = axios.create({
    baseURL: 'https://authenticated-crud-app.onrender.com',
    withCredentials: true
})

export default api