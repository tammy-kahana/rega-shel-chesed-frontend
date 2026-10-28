import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    throw new Error("VITE_API_URL is missing");
}

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use((response) => response,
    (error) => {
        if (error.response?.status === 401 && error.config?.headers?.Authorization) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)