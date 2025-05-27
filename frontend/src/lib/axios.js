import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
})

export default api;
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};