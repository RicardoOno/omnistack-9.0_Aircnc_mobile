import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.43.145:3334'
})

export default api;