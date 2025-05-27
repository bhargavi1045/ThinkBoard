import axios from 'axios';

const BASE_URL = import.meta.env.MODE==="development" ? 'http://localhost:5001/api' : "/api"
const api = axios.create({
    baseURL: BASE_URL,
})

export default api;
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};